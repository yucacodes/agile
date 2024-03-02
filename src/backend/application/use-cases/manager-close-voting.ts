import { MeetingsRepository, VotingClosedEvent } from '@domain'
import { Authorization, EventsBus, useCase } from '@framework'
import { TimeProvider } from '@framework'
import type { AuthInformationDto } from '../dtos'
import {
  ManagerCloseVotingRequestDtoValidator,
  type ManagerCloseVotingRequestDto,
} from '../dtos'

@useCase({
  allowRole: (req) => `meeting/${req.meetingId}/participant`,
  requestValidator: ManagerCloseVotingRequestDtoValidator,
})
export class ManagerCloseVoting {
  constructor(
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private eventsBus: EventsBus
  ) {}

  async perform(request: ManagerCloseVotingRequestDto): Promise<void> {
    const authInfo = this.authorization.get()
    const { meetingId, votingId } = request
    const meeting = await this.meetingsRepository.findById(meetingId)
    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const participant = meeting.participant(authInfo.userId)
    if (!participant) {
      throw new Error('Participant not found.')
    }

    if (!participant.isManager()) {
      throw new Error('You do not have permission to close the voting.')
    }

    const voting = meeting.voting(votingId)
    if (!voting) {
      throw new Error('Voting not found.')
    }

    voting.manualClose()

    const event = VotingClosedEvent.factory({
      meeting,
      voting,
      timeProvider: this.timeProvider,
    })

    this.eventsBus.notifyToOrigin({ event, channel: `meeting/${meeting.id()}` })

    await this.meetingsRepository.saveUpdate(meeting)

  }
}
