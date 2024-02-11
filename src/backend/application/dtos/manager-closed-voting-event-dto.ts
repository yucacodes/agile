import { type VotingClosedEvent } from '@domain'
import { singleton } from '@framework/injection'
import { type VotingDto, VotingDtoMapper } from './voting-dto'

export interface ManagerClosedVotingEventDto {
  voting: VotingDto
  time: string
}

@singleton()
export class ManagerClosedVotingEventDtoMapper {
  constructor(private votingtDtoMapper: VotingDtoMapper) {}

  makeDto(obj: VotingClosedEvent): ManagerClosedVotingEventDto {
    return {
      voting: this.votingtDtoMapper.makeDto(obj.voting()),
      time: obj.time.toString(),
    }
  }
}
