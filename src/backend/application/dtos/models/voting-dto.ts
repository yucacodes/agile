import { Voting } from '@domain'
import { CollectionsMapper, dtoMapper } from '@framework'
import { EntityDtoMapper, type EntityDto } from './entity-dto'
import { ParticipantDto, ParticipantDtoMapper } from './participant-dto'

export interface VotingDto extends EntityDto {
  timeLimit: string
  participantVotes: { [userId: string]: number | null }
  participants: { [userId: string]: ParticipantDto }
  isClosed: boolean
  closedAt: string | null
}

@dtoMapper({ model: Voting })
export class VotingDtoMapper extends CollectionsMapper {
  constructor(
    private entityDtoMapper: EntityDtoMapper,
    private participantDtoMapper: ParticipantDtoMapper
  ) {
    super()
  }

  map(obj: Voting): VotingDto {
    const participantVotes: { [key: string]: number | null } = {}
    for (const [key, num] of obj.votes()) {
      participantVotes[key] = obj.isOpen() ? null : num
    }

    return {
      ...this.entityDtoMapper.map(obj),
      timeLimit: obj.timeLimit().toISOString(),
      participantVotes,
      participants: this.participantDtoMapper.mapMap(obj.participants()),
      isClosed: obj.isClosed(),
      closedAt: obj.closedAt()?.toISOString() ?? null,
    }
  }
}
