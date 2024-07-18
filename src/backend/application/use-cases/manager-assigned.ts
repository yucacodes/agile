import { MeetingsRepository, ManagerAssignedEvent } from '@domain'
import { EventsBus, useCase } from '@framework'

@useCase({ allowAnyRole: true, disableRequestValidation: true })
export class ManagerAssigned {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private eventsBus: EventsBus
  ) {}

  async perform(meetingId: string): Promise<void> {
    const meeting = await this.meetingsRepository.findById(meetingId)
    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const currentManager = meeting.getManager()
    if (currentManager && currentManager.isConnected()) {
      throw new Error('Manager is already connected')
    }

    const newManager = meeting.assignManagerRole()

    await this.meetingsRepository.saveUpdate(meeting)

    const managerAssignedEvent = ManagerAssignedEvent.factory({
      meeting,
      participant: newManager,
    })
    this.eventsBus.notify({
      event: managerAssignedEvent,
      channel: `meeting/${meeting.id()}`,
    })
  }
}
