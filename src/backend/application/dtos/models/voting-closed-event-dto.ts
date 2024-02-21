import { VotingClosedEvent } from '@domain'
import { type VotingDto, VotingDtoMapper } from './voting-dto'
import { dtoMapper } from '@framework'

export interface VotingClosedEventDto {
  voting: VotingDto
  time: string
}

@dtoMapper({ model: VotingClosedEvent })
export class VotingClosedEventDtoMapper {
  constructor(private votingtDtoMapper: VotingDtoMapper) {}

  map(obj: VotingClosedEvent): VotingClosedEventDto {
    return {
      voting: this.votingtDtoMapper.map(obj.voting()),
      time: obj.time.toString(),
    }
  }
}
