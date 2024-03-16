import { VotingStartedEvent } from '@domain'
import { dtoMapper } from '@framework'
import { VotingDto, VotingDtoMapper } from './voting-dto'

export interface VotingStartedEventDto {
  votingId: string
  time: string
  voting: VotingDto
}

@dtoMapper({ model: VotingStartedEvent })
export class VotingStartedEventDtoMapper {
  constructor(private votingDtoMapper: VotingDtoMapper) {}

  map(obj: VotingStartedEvent): VotingStartedEventDto {
    return {
      votingId: obj.voting().id(),
      time: obj.time().toISOString(),
      voting: this.votingDtoMapper.map(obj.voting()),
    }
  }
}
