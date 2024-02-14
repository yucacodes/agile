import { MeetingsRepository, ParticipantDisconnectedEvent } from '@domain'
import { Authorization, EventsBus, useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import {
  type AuthInformationDto,
  type MeetingParticipantDisconnectedRequestDto,
} from '../dtos'

@useCase({ allowRole: (req) => `meeting/${req.meetingId}/participant` })
export class ParticipantDisconectedFromMeeting {
  constructor(
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private eventsBus: EventsBus
  ) {}

  async perform(
    request: MeetingParticipantDisconnectedRequestDto
  ): Promise<void> {
    const auth = this.authorization.get()
    const meeting = await this.meetingsRepository.findById(request.meetingId)
    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const participant = meeting.participant(auth.userId)
    if (!participant) {
      throw new Error('Invalid participant')
    }

    participant.setAsDisconnected()

    const event = ParticipantDisconnectedEvent.factory({
      meeting,
      participant,
      timeProvider: this.timeProvider,
    })

    this.eventsBus.notify({ event, channel: `meeting/${meeting.id()}` })

    await this.meetingsRepository.saveUpdate(meeting)
  }
}
