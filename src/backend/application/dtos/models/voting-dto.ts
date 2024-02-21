import { Voting } from '@domain'
import { dtoMapper } from '@framework/application'
import { EntityDtoMapper, type EntityDto } from './entity-dto'

export interface VotingDto extends EntityDto {
  participantVotes: { [key: string]: number }
}

@dtoMapper({ model: Voting })
export class VotingDtoMapper {
  constructor(private entityDtoMapper: EntityDtoMapper) {}

  map(obj: Voting): VotingDto {
    const participantVotes: { [key: string]: number } = {}
    for (const [key, num] of obj.votes()) participantVotes[key] = num
    return {
      ...this.entityDtoMapper.map(obj),
      participantVotes,
    }
  }
}
