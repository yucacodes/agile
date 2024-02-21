import {
  MeetingsRepository,
  Participant,
  ParticipantJoinedEvent,
  User,
} from '@domain'
import { Authorization, EventsBus, useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import type { MeetingAndAuthInfoDto } from '../dtos'
import {
  MeetingDtoMapper,
  UserJoinMeetingRequestDtoValidator,
  type AuthInformationDto,
  type UserJoinMeetingRequestDto,
} from '../dtos'

@useCase({
  disableAuthValidation: true,
  requestValidator: UserJoinMeetingRequestDtoValidator,
})
export class UserJoinMeeting {
  constructor(
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private meetingDtoMapper: MeetingDtoMapper,
    private eventsBus: EventsBus
  ) {}

  async perform(
    request: UserJoinMeetingRequestDto
  ): Promise<MeetingAndAuthInfoDto> {
    const meeting = await this.meetingsRepository.findById(request.meetingId)

    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const user = User.factory({
      timeProvider: this.timeProvider,
    })

    const participant = Participant.factory({
      user,
      name: request.name,
    })

    meeting.addParticipant(participant, request.secret)

    const event = ParticipantJoinedEvent.factory({
      participant,
      meeting,
      timeProvider: this.timeProvider,
    })

    this.eventsBus.notify({ event, channel: `meeting/${meeting.id()}` })
    this.eventsBus.subscribe({ channel: `meeting/${meeting.id()}` })

    const auth = {
      userId: user.id(),
      roles: [`meeting/${meeting.id()}/participant`],
    }
    this.authorization.set(auth)

    return {
      secret: request.secret,
      meeting: this.meetingDtoMapper.map(meeting),
      authInfo: auth,
    }
  }
}
