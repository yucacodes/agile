import { MeetingsRepository } from '@domain'
import { singleton } from 'tsyringe'
import { UseCase } from './use-case'
import type { VotingInformationDto, UserVotingDto } from '../dtos'

@singleton()
export class UserVoting extends UseCase<UserVotingDto, VotingInformationDto> {
  constructor(private meetingsRepository: MeetingsRepository) {
    super()
  }

  async perform(request: UserVotingDto): Promise<VotingInformationDto> {
    const { meetingId, votingId, point, participantId } = request

    const meeting = await this.meetingsRepository.fetchById(meetingId)

    if (!meeting) {
      throw new Error('Meeting not found.')
    }

    const voting = meeting.getVotings().find((v) => v.votingId() === votingId)

    if (!voting) {
      throw new Error('Voting not found.')
    }

    if (voting.isOpen()) {
      const participant = meeting.participantById(participantId)

      if (!participant) {
        throw new Error('Participant not found.')
      }

      voting.setVoteByParticipant(participant, point)
    }

    const participant = meeting.participantById(participantId)

    if (!participant) {
      throw new Error('Participant not found.')
    }

    return {
      participant: participant.name(),
      point: point,
    }
  }
}
