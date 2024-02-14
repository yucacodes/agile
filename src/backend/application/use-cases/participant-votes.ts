import {
  MeetingEventsBus,
  MeetingsRepository,
  ParticipantVotedEvent,
  UserRole,
} from '@domain'
import { useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import type { AuthInformationDto, UserVotingRequestDto } from '../dtos'

@useCase({ roles: [UserRole.MeetingParticipant] })
export class ParticipantVotes {
  constructor(
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {}

  async perform(
    request: UserVotingRequestDto,
    authInformation: AuthInformationDto
  ): Promise<void> {
    const { meetingId, votingId, point } = request
    const meeting = await this.meetingsRepository.findById(meetingId)
    if (!meeting) {
      throw new Error('Meeting not found.')
    }

    const voting = meeting.voting(votingId)
    if (!voting) {
      throw new Error('Voting not found.')
    }

    if (!voting.isOpen()) {
      throw new Error('Voting is closed.')
    }

    const participant = meeting.participant(authInformation.userId)

    if (!participant) {
      throw new Error('Participant not found.')
    }

    voting.setParticipantVote(participant, point)

    this.meetingEventsBus.notify(
      ParticipantVotedEvent.factory({
        meeting,
        participant,
        voting: voting,
        timeProvider: this.timeProvider,
      })
    )
  }
}
