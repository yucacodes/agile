import { type VotingStartedEvent } from '@domain'
import { singleton } from '@framework/injection'

export interface ManagerStartedVotingEventDto {
  votingId: string
  time: string
}

@singleton()
export class ManagerStartedVotingEventDtoMapper {
  constructor() {}

  makeDto(obj: VotingStartedEvent): ManagerStartedVotingEventDto {
    return {
      votingId: obj.votingId(),
      time: obj.time.toString(),
    }
  }
}
