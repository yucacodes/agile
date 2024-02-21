import { VotingClosedEvent } from '@domain'
import { type VotingDto, VotingDtoMapper } from './voting-dto'
import { dtoMapper } from '@framework'

export interface ManagerClosedVotingEventDto {
  voting: VotingDto
  time: string
}

@dtoMapper({ model: VotingClosedEvent })
export class ManagerClosedVotingEventDtoMapper {
  constructor(private votingtDtoMapper: VotingDtoMapper) {}

  map(obj: VotingClosedEvent): ManagerClosedVotingEventDto {
    return {
      voting: this.votingtDtoMapper.map(obj.voting()),
      time: obj.time.toString(),
    }
  }
}
