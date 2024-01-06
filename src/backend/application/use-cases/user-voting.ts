import { MeetingsRepository } from '@domain'
import { singleton } from 'tsyringe'
import { UseCase, type AuthInformationDto } from '@framework/application'
import type { VotingInformationDto, UserVotingRequestDto } from '../dtos'
import { TimeManager } from '@framework/domain'

@singleton()
export class UserVoting extends UseCase<
  UserVotingRequestDto,
  VotingInformationDto
> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private timeManager: TimeManager
  ) {
    super()
  }

  async perform(
    request: UserVotingRequestDto,
    authInformation?: AuthInformationDto | null
  ): Promise<VotingInformationDto> {
    if (!authInformation) throw new Error('Invalid auth information')

    const { meetingId, votingId, point } = request

    const meeting = await this.meetingsRepository.fetchById(meetingId)

    if (!meeting) {
      throw new Error('Meeting not found.')
    }

    const voting = meeting.votingById(votingId)

    if (!voting) {
      throw new Error('Voting not found.')
    }

    const isVotingOpen = voting.isOpen(this.timeManager)

    if (!isVotingOpen) {
      throw new Error('Voting is closed.')
    }

    const participant = meeting.participantById(authInformation.userId)

    if (!participant) {
      throw new Error('Participant not found.')
    }

    voting.setVoteByParticipant(participant, point)

    return {
      userId: participant.userId(),
      point,
      votingId: voting.id(),
    }
  }
}
