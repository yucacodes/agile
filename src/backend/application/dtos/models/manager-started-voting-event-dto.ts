import { VotingStartedEvent } from '@domain'
import { dtoMapper } from '@framework/application'

export interface ManagerStartedVotingEventDto {
  votingId: string
  time: string
}

@dtoMapper({ model: VotingStartedEvent })
export class ManagerStartedVotingEventDtoMapper {
  constructor() {}

  map(obj: VotingStartedEvent): ManagerStartedVotingEventDto {
    return {
      votingId: obj.votingId(),
      time: obj.time.toString(),
    }
  }
}
