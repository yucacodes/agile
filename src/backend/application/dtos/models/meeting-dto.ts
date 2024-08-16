import { Meeting } from '@domain'
import { dtoMapper } from '@yucacodes/es'
import { EntityDtoMapper, type EntityDto } from './entity-dto'
import { ParticipantDtoMapper, type ParticipantDto } from './participant-dto'
import type { VotingDto } from './voting-dto'
import { VotingDtoMapper } from './voting-dto'

export interface MeetingDto extends EntityDto {
  participants: { [key: string]: ParticipantDto }
  votings: { [key: string]: VotingDto }
}

@dtoMapper({ model: Meeting })
export class MeetingDtoMapper {
  constructor(
    private entityMapper: EntityDtoMapper,
    private participantDtoMapper: ParticipantDtoMapper,
    private votingDtoMapper: VotingDtoMapper
  ) {}

  map(obj: Meeting): MeetingDto {
    return {
      ...this.entityMapper.map(obj),
      participants: this.participantDtoMapper.mapMap(obj.participants()),
      votings: this.votingDtoMapper.mapMap(obj.allVotings()),
    }
  }
}
