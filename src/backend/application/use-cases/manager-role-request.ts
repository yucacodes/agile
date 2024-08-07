import { MeetingsRepository, ManagerRoleRequestEvent } from '@domain'
import { Authorization, EventsBus, useCase } from '@framework'
import {
  ManagerRoleRequestDtoValidator,
  type ManagerRoleRequestDto,
  type AuthInformationDto,
} from '../dtos'

@useCase({
  allowRole: (req) => `meeting/${req.meetingId}/participant`,
  requestValidator: ManagerRoleRequestDtoValidator,
})
export class ManagerRoleRequest {
  constructor(
    private authorization: Authorization<AuthInformationDto>,
    private meetingsRepository: MeetingsRepository,
    private eventsBus: EventsBus
  ) {}

  async perform(request: ManagerRoleRequestDto): Promise<void> {
    const auth = this.authorization.get()
    const { meetingId } = request
    const meeting = await this.meetingsRepository.findById(meetingId)

    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const currentManager = meeting.getManager()
    if (currentManager && currentManager.isConnected()) {
      throw new Error('Manager is already connected')
    }

    const participant = meeting.participant(auth.userId)
    if (!participant) {
      throw new Error('Participant not found')
    }

    const potentialManager = meeting.getPotencialManager()

    if (participant !== potentialManager) {
      throw new Error('Invalid potential manager')
    }

    const newManager = meeting.setAsManager()
    await this.meetingsRepository.saveUpdate(meeting)

    const managerRoleRequestEvent = ManagerRoleRequestEvent.factory({
      meeting,
      participant: newManager,
    })

    this.eventsBus.notify({
      event: managerRoleRequestEvent,
      channel: `meeting/${meeting.id()}`,
    })
  }
}
