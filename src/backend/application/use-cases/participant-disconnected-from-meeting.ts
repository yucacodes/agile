import {
  MeetingEventsBus,
  MeetingsRepository,
  ParticipantDisconnectedEvent,
  UserRole,
} from '@domain'
import { useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import {
  type AuthInformationDto,
  type MeetingParticipantDisconnectedRequestDto,
} from '../dtos'

@useCase({ roles: [UserRole.MeetingParticipant] })
export class ParticipantDisconectedFromMeeting {
  constructor(
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {}
  async perform(
    request: MeetingParticipantDisconnectedRequestDto,
    authInformation: AuthInformationDto
  ): Promise<void> {
    const meeting = await this.meetingsRepository.findById(request.meetingId)
    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const participant = meeting.participant(authInformation.userId)
    if (!participant) {
      throw new Error('Invalid participant')
    }

    participant.setAsDisconnected()

    this.meetingEventsBus.notify(
      ParticipantDisconnectedEvent.factory({
        meeting,
        participant,
        timeProvider: this.timeProvider,
      })
    )

    await this.meetingsRepository.saveUpdate(meeting)
  }
}
