import { Voting } from '@domain'
import { dtoMapper } from '@framework/application'

export interface VotingDto {
  votingId: string
  userVotes: { [key: string]: number }
}

@dtoMapper({ model: Voting })
export class VotingDtoMapper {
  map(obj: Voting): VotingDto {
    const userVotes: { [key: string]: number } = {}
    for (const [key, num] of obj.votes()) userVotes[key] = num
    return {
      votingId: obj.id(),
      userVotes,
    }
  }
}
