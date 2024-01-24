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
      votingId: obj.voting(),
      time: obj.time.toString(),
    }
  }
}
