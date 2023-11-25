import {
  Meeting,
  MeetingEventsBus,
  MeetingParticipant,
  MeetingParticipantJoinedEvent,
  MeetingsRepository,
} from '@domain'
import { singleton } from 'tsyringe'
import {
  MeetingDtoMapper,
  type MeetingWithAuthInformationDto,
  type UserCreateMeetingRequestDto,
} from '../dtos'
import { GenerateMeetingAuthInformation } from '../helpers'

@singleton()
export class UserCreateMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private generateMeetingAuthInformation: GenerateMeetingAuthInformation,
    private meetingDtoMapper: MeetingDtoMapper,
    private meetingEventsBus: MeetingEventsBus
  ) {}

  async perform(
    request: UserCreateMeetingRequestDto
  ): Promise<MeetingWithAuthInformationDto> {
    const { meeting: newMeeting, secret: meetingSecret } = Meeting.factory()

    const firstParticipant = MeetingParticipant.factory({
      meeting: newMeeting,
      name: request.name,
      roles: ['Manager', 'Participant'],
    })

    newMeeting.addParticipant(firstParticipant, meetingSecret)

    await this.meetingsRepository.save(newMeeting)
    this.meetingEventsBus.notify(
      MeetingParticipantJoinedEvent.factory({
        meetingParticipant: firstParticipant,
      })
    )

    return {
      meeting: this.meetingDtoMapper.makeDto(newMeeting),
      authInfo: this.generateMeetingAuthInformation.perform(
        newMeeting,
        firstParticipant,
        meetingSecret
      ),
    }
  }
}
