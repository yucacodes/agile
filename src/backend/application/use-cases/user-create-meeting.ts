import {
  Meeting,
  MeetingsRepository,
  Participant,
  User,
  UserRole,
} from '@domain'
import { useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import { GenerateAuthInformation } from '../auth'
import {
  MeetingDtoMapper,
  type MeetingWithAuthInformationDto,
  type UserCreateMeetingRequestDto,
} from '../dtos'

@useCase({ noLogin: true })
export class UserCreateMeeting {
  constructor(
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private generateMeetingAuthInformation: GenerateAuthInformation,
    private meetingDtoMapper: MeetingDtoMapper
  ) {}

  async perform(
    request: UserCreateMeetingRequestDto
  ): Promise<MeetingWithAuthInformationDto> {
    const { meeting, secret } = Meeting.factory({
      timeProvider: this.timeProvider,
    })

    const user = User.factory({
      timeProvider: this.timeProvider,
      roles: [UserRole.MeetingParticipant],
    })

    const manager = Participant.factory({
      name: request.name,
      isManager: true,
      user,
    })

    meeting.addParticipant(manager, secret)

    await this.meetingsRepository.saveNew(meeting)

    return {
      secret,
      meeting: this.meetingDtoMapper.map(meeting),
      authInfo: this.generateMeetingAuthInformation.perform(user),
    }
  }
}
