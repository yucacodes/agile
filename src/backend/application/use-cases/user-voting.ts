import { Voting } from '@domain'
import { singleton } from 'tsyringe'
import { UseCase } from './use-case'
import type { VotingInformationDto, UserVotingDto } from '../dtos'

@singleton()
export class UserVoting extends UseCase<UserVotingDto, VotingInformationDto> {
  constructor(private voting: Voting) {
    super()
  }

  async perform(request: UserVotingDto): Promise<VotingInformationDto> {
    if (this.voting.status() === 'open') {
      this.voting.closeVoting()
    } else {
      throw new Error('Voting is already closed.')
    }

    return {
      userId: request.userId,
      selectedOptionId: request.selectedOptionId,
    }
  }
}
