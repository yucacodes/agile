import {
  MeetingsRepository,
  Participant,
  ParticipantJoinedEvent,
  RefreshToken,
  RefreshTokensRepository,
  User,
} from '@domain'
import type { MeetingAndSessionDataDto } from '../dtos'
import {
  MeetingDtoMapper,
  UserJoinMeetingRequestDtoValidator,
  type AuthInformationDto,
  type UserJoinMeetingRequestDto,
} from '../dtos'
import { Authorization, EventsBus, TimeProvider, useCase } from '@yucacodes/es'

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
    private eventsBus: EventsBus,
    private refreshTokensRepository: RefreshTokensRepository
  ) {}

  async perform(
    request: UserJoinMeetingRequestDto
  ): Promise<MeetingAndSessionDataDto> {
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
    await this.meetingsRepository.saveUpdate(meeting)
    await this.refreshTokensRepository.saveNew(refreshToken)
    this.authorization.set(auth)
    this.eventsBus.notify({ event, channel: `meeting/${meeting.id()}` })

    return {
      secret: request.secret,
      meeting: this.meetingDtoMapper.map(meeting),
      sessionData: {
        userId: auth.userId,
        roles: auth.roles,
        refreshTokenId: refreshToken.id(),
        refreshTokenSecret: tokenSecret,
      },
    }
  }
}
