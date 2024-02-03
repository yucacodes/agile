import type { Voting } from '@domain'
import { singleton } from '@framework/injection'

export interface VotingDto {
  votingId: string
  userVotes: { [key: string]: number }
}

@singleton()
export class VotingDtoMapper {
  makeDto(obj: Voting): VotingDto {
    const userVotes: { [key: string]: number } = {}
    for (const [key, num] of obj.votes()) userVotes[key] = num
    return {
      votingId: obj.id(),
      userVotes,
    }
  }
}
