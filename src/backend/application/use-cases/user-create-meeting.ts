import {
  Meeting,
  MeetingsRepository,
  Participant,
  RefreshToken,
  RefreshTokensRepository,
  User,
} from '@domain'
import { Authorization, EventsBus, TimeProvider, useCase } from '@yucacodes/es'
import type { MeetingAndSessionDataDto } from '../dtos'
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
    private eventsBus: EventsBus,
    private refreshTokensRepository: RefreshTokensRepository
  ) {}

  async perform(
    request: UserCreateMeetingRequestDto
  ): Promise<MeetingAndSessionDataDto> {
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

    const auth = {
      userId: user.id(),
      roles: [`meeting/${meeting.id()}/participant`],
    }

    const { refreshToken, secret: tokenSecret } = RefreshToken.factory({
      timeProvider: this.timeProvider,
      userId: auth.userId,
      roles: auth.roles,
    })

    this.eventsBus.subscribe({ channel: `meeting/${meeting.id()}` })
    await this.meetingsRepository.saveNew(meeting)
    await this.refreshTokensRepository.saveNew(refreshToken)
    this.authorization.set(auth)

    return {
      meeting: this.meetingDtoMapper.map(meeting),
      secret,
      sessionData: {
        refreshTokenId: refreshToken.id(),
        refreshTokenSecret: tokenSecret,
        roles: auth.roles,
        userId: auth.userId,
      },
    }
  }
}
