import {
  MeetingEventsBus,
  MeetingsRepository,
  UserRole,
  VotingClosedEvent,
} from '@domain'
import { useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import type { AuthInformationDto } from '../dtos'
import { type ManagerClosedVotingRequestDto } from '../dtos'

@useCase({ roles: [UserRole.MeetingParticipant] })
export class ManagerCloseVoting {
  constructor(
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {}

  async perform(
    request: ManagerClosedVotingRequestDto,
    authInformation: AuthInformationDto
  ): Promise<void> {
    const { meetingId, votingId } = request
    const meeting = await this.meetingsRepository.findById(meetingId)
    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const participant = meeting.participant(authInformation.userId)
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

    this.meetingEventsBus.notify(
      VotingClosedEvent.factory({
        meeting,
        voting,
        timeProvider: this.timeProvider,
      })
    )

    await this.meetingsRepository.saveUpdate(meeting)
  }
}
