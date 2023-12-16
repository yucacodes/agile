import { Meeting, MeetingParticipant, MeetingsRepository, User } from '@domain'
import { singleton } from '@injection'
import {
  MeetingDtoMapper,
  type MeetingWithAuthInformationDto,
  type UserCreateMeetingRequestDto,
} from '../dtos'
import { GenerateAuthInformation } from '../helpers'
import { UseCase } from './use-case'

@singleton()
export class UserCreateMeeting extends UseCase<
  UserCreateMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private generateMeetingAuthInformation: GenerateAuthInformation,
    private meetingDtoMapper: MeetingDtoMapper
  ) {
    super()
  }

  async perform(
    request: UserCreateMeetingRequestDto
  ): Promise<MeetingWithAuthInformationDto> {
    const { meeting: newMeeting, secret: meetingSecret } = Meeting.factory()

    const user = User.factory({ roles: ['MeetingParticipant'] })

    const firstParticipant = MeetingParticipant.factory({
      meeting: newMeeting,
      name: request.name,
      isManager: true,
      user,
    })

    newMeeting.addParticipant(firstParticipant, meetingSecret)

    await this.meetingsRepository.save(newMeeting)

    return {
      secret: meetingSecret,
      meeting: this.meetingDtoMapper.makeDto(newMeeting),
      authInfo: this.generateMeetingAuthInformation.perform(user),
    }
  }
}
