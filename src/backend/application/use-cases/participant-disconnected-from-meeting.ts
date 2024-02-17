import { MeetingsRepository, ParticipantDisconnectedEvent } from '@domain'
import { Authorization, EventsBus, useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import { type AuthInformationDto } from '../dtos'

@useCase({ allowAnyRole: true, disableRequestValidation: true })
export class ParticipantDisconectedFromMeeting {
  constructor(
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private eventsBus: EventsBus
  ) {}

  async perform(): Promise<void> {
    const auth = this.authorization.get()
    const meetingId = auth.roles
      .find((x) => x.startsWith('meeting'))
      ?.split('/')
      .at(1)

    if (!meetingId) {
      throw new Error('Invalid meeting id')
    }

    const meeting = await this.meetingsRepository.findById(meetingId)
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
