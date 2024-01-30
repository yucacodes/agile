import type { Voting } from '@domain'
import { singleton } from '@framework/injection'

export interface VotingDto {
  votingId: string
  userVotes: Map<string, number>
}

@singleton()
export class VotingDtoMapper {
  makeDto(obj: Voting): VotingDto {
    return {
      votingId: obj.id(),
      userVotes: obj.votes(),
    }
  }

  makeMapDtos(map: Map<string, Voting>): {
    [key: string]: VotingDto
  } {
    const result: { [key: string]: VotingDto } = {}
    for (const [key, obj] of map.entries()) result[key] = this.makeDto(obj)
    return result
  }
}
