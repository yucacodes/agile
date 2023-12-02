import {
  MeetingEventsBus,
  MeetingParticipant,
  MeetingParticipantJoinedEvent,
  MeetingsRepository,
  User,
} from '@domain'
import { singleton } from 'tsyringe'
import {
  MeetingDtoMapper,
  type MeetingWithAuthInformationDto,
  type UserJoinMeetingRequestDto,
} from '../dtos'
import { GenerateAuthInformation } from '../helpers'
import { UseCase } from './use-case'

@singleton()
export class UserJoinMeeting extends UseCase<
  UserJoinMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private generateAuthInformation: GenerateAuthInformation,
    private meetingDtoMapper: MeetingDtoMapper,
    private meetingEventsBus: MeetingEventsBus
  ) {
    super()
  }

  async perform(
    request: UserJoinMeetingRequestDto
  ): Promise<MeetingWithAuthInformationDto> {
    const existingMeeting = await this.meetingsRepository.fetchById(
      request.meetingId
    )

    if (!existingMeeting) {
      throw new Error('Invalid meeting')
    }

    const user = User.factory({ roles: ['MeetingParticipant'] })

    const newParticipant = MeetingParticipant.factory({
      meeting: existingMeeting,
      name: request.name,
      user,
    })

    existingMeeting.addParticipant(newParticipant, request.secret)

    this.meetingEventsBus.notify(
      MeetingParticipantJoinedEvent.factory({
        meetingParticipant: newParticipant,
      })
    )

    return {
      meeting: this.meetingDtoMapper.makeDto(existingMeeting),
      authInfo: this.generateAuthInformation.perform(user),
      secret: request.secret,
    }
  }
}
