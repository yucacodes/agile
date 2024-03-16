import { Voting } from '@domain'
import { CollectionsMapper, dtoMapper } from '@framework'
import { EntityDtoMapper, type EntityDto } from './entity-dto'

export interface VotingDto extends EntityDto {
  timeLimit: string
  participantVotes: { [key: string]: number | null }
}

@dtoMapper({ model: Voting })
export class VotingDtoMapper extends CollectionsMapper {
  constructor(private entityDtoMapper: EntityDtoMapper) {
    super()
  }

  map(obj: Voting): VotingDto {
    const participantVotes: { [key: string]: number | null } = {}
    for (const [key, num] of obj.votes()) {
      participantVotes[key] = obj.isOpen() ? null : num
    }
    return {
      ...this.entityDtoMapper.map(obj),
      participantVotes,
      timeLimit: obj.timeLimit().toISOString(),
    }
  }
}
