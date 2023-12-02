import {
  MeetingEventsBus,
  MeetingParticipant,
  MeetingParticipantJoinedEvent,
  MeetingsRepository,
} from '@domain'
import { singleton } from 'tsyringe'
import {
  MeetingDtoMapper,
  type MeetingWithAuthInformationDto,
  type UserJoinMeetingRequestDto,
} from '../dtos'
import { GenerateMeetingAuthInformation } from '../helpers'

@singleton()
export class UserJoinMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private generateMeetingAuthInformation: GenerateMeetingAuthInformation,
    private meetingDtoMapper: MeetingDtoMapper,
    private meetingEventsBus: MeetingEventsBus
  ) {}

  async perform(
    request: UserJoinMeetingRequestDto
  ): Promise<MeetingWithAuthInformationDto> {
    const existingMeeting = await this.meetingsRepository.fetchById(
      request.meetingId
    )

    if (!existingMeeting) {
      throw new Error('Invalid meeting')
    }

    const newParticipant = MeetingParticipant.factory({
      meeting: existingMeeting,
      name: request.name,
      roles: ['Participant'],
    })

    existingMeeting.addParticipant(newParticipant, request.secret)

    this.meetingEventsBus.notify(
      MeetingParticipantJoinedEvent.factory({
        meetingParticipant: newParticipant,
      })
    )

    return {
      meeting: this.meetingDtoMapper.makeDto(existingMeeting),
      authInfo: this.generateMeetingAuthInformation.perform(
        existingMeeting,
        newParticipant,
        request.secret
      ),
    }
  }
}
