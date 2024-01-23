import { type Voting, type VotingClosedEvent } from '@domain'
import { singleton } from '@framework/injection'

export interface ManagerClosedVotingEventDto {
  voting: Voting
  time: string
}

@singleton()
export class ManagerClosedVotingEventDtoMapper {
  constructor() {}

  makeDto(obj: VotingClosedEvent): ManagerClosedVotingEventDto {
    return {
      voting: obj.voting(),
      time: obj.time.toString(),
    }
  }
}
