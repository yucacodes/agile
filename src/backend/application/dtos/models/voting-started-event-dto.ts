import { VotingStartedEvent } from '@domain'
import { dtoMapper } from '@framework'

export interface VotingStartedEventDto {
  votingId: string
  time: string
}

@dtoMapper({ model: VotingStartedEvent })
export class VotingStartedEventDtoMapper {
  constructor() {}

  map(obj: VotingStartedEvent): VotingStartedEventDto {
    return {
      votingId: obj.votingId(),
      time: obj.time().toISOString(),
    }
  }
}
