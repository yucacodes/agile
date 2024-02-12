import {
  MeetingEventsBus,
  ParticipantVotedEvent,
  MeetingsRepository,
  UserRole,
} from '@domain'
import { useCase, type AuthInformationDto } from '@framework/application'
import type { UserVotingRequestDto, VotingInformationDto } from '../dtos'
import { TimeProvider } from '@framework/domain'

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
  ): Promise<VotingInformationDto> {
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

    return {
      userId: participant.userId(),
      point,
      votingId: voting.id(),
    }
  }
}
