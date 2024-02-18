import { Meeting, MeetingsRepository, Participant, User } from '@domain'
import { Authorization, EventsBus, useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import type { MeetingAndAuthInfoDto } from '../dtos'
import {
  MeetingDtoMapper,
  UserCreateMeetingRequestDtoValidator,
  type AuthInformationDto,
  type UserCreateMeetingRequestDto,
} from '../dtos'

@useCase({
  disableAuthValidation: true,
  requestValidator: UserCreateMeetingRequestDtoValidator,
})
export class UserCreateMeeting {
  constructor(
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private meetingDtoMapper: MeetingDtoMapper,
    private eventsBus: EventsBus
  ) {}

  async perform(
    request: UserCreateMeetingRequestDto
  ): Promise<MeetingAndAuthInfoDto> {
    const { meeting, secret } = Meeting.factory({
      timeProvider: this.timeProvider,
    })

    const user = User.factory({
      timeProvider: this.timeProvider,
    })

    const manager = Participant.factory({
      name: request.name,
      isManager: true,
      user,
    })

    meeting.addParticipant(manager, secret)

    await this.meetingsRepository.saveNew(meeting)

    const auth = {
      userId: user.id(),
      roles: [`meeting/${meeting.id()}/participant`],
    }
    this.authorization.set(auth)

    this.eventsBus.subscribe({ channel: `meeting/${meeting.id()}` })

    return {
      meeting: this.meetingDtoMapper.map(meeting),
      secret,
      authInfo: auth,
    }
  }
}
