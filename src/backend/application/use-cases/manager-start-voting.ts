import { MeetingsRepository, VotingStartedEvent } from '@domain'
import { Authorization, EventsBus, useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import type { AuthInformationDto } from '../dtos'
import {
  ManagerStartVotingRequestDtoValidator,
  type ManagerStartVotingRequestDto,
} from '../dtos'

@useCase({
  allowRole: (req) => `meeting/${req.meetingId}/participant`,
  requestValidator: ManagerStartVotingRequestDtoValidator,
})
export class ManagerStartVoting {
  constructor(
    private eventsBus: EventsBus,
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository
  ) {}

  async perform(request: ManagerStartVotingRequestDto): Promise<void> {
    const auth = this.authorization.get()
    const { meetingId } = request
    const meeting = await this.meetingsRepository.findById(meetingId)
    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const participant = meeting.participant(auth.userId)
    if (!participant) {
      throw new Error('Participant not found.')
    }

    if (!participant.isManager()) {
      throw new Error('You do not have permission to start the voting.')
    }

    const voting = meeting.newVoting()

    const event = VotingStartedEvent.factory({
      meeting,
      voting,
      timeProvider: this.timeProvider,
    })

    this.eventsBus.notify({ event, channel: `meeting/${meeting.id()}` })

    await this.meetingsRepository.saveUpdate(meeting)
  }
}
