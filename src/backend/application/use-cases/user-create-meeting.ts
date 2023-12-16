import { Meeting, MeetingParticipant, MeetingsRepository } from '@domain'
import { GenerateAuthInformation, UseCase } from '@framework/application'
import { User } from '@framework/domain'
import { singleton } from '@framework/injection'
import {
  MeetingDtoMapper,
  type MeetingWithAuthInformationDto,
  type UserCreateMeetingRequestDto,
} from '../dtos'

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
