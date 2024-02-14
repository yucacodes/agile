import {
  MeetingEventsBus,
  MeetingsRepository,
  Participant,
  ParticipantJoinedEvent,
  User,
  UserRole,
} from '@domain'
import { useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import { GenerateAuthInformation } from '../auth'
import {
  MeetingDtoMapper,
  type MeetingWithAuthInformationDto,
  type UserJoinMeetingRequestDto,
} from '../dtos'

@useCase({ noLogin: true })
export class UserJoinMeeting {
  constructor(
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private generateAuthInformation: GenerateAuthInformation,
    private meetingDtoMapper: MeetingDtoMapper,
    private meetingEventsBus: MeetingEventsBus
  ) {}

  async perform(
    request: UserJoinMeetingRequestDto
  ): Promise<MeetingWithAuthInformationDto> {
    const meeting = await this.meetingsRepository.findById(request.meetingId)

    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const user = User.factory({
      roles: [UserRole.MeetingParticipant],
      timeProvider: this.timeProvider,
    })

    const participant = Participant.factory({
      user,
      name: request.name,
    })

    meeting.addParticipant(participant, request.secret)

    this.meetingEventsBus.notify(
      ParticipantJoinedEvent.factory({
        participant,
        meeting,
        timeProvider: this.timeProvider,
      })
    )

    return {
      meeting: this.meetingDtoMapper.map(meeting),
      authInfo: this.generateAuthInformation.perform(user),
      secret: request.secret,
    }
  }
}
