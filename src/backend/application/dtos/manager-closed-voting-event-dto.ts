import { VotingClosedEvent } from '@domain'
import { type VotingDto, VotingDtoMapper } from './voting-dto'
import { dtoMapper } from '@framework/application'

export interface ManagerClosedVotingEventDto {
  voting: VotingDto
  time: string
}

@dtoMapper({ group: 'MeetingManager', model: VotingClosedEvent })
export class ManagerClosedVotingEventDtoMapper {
  constructor(private votingtDtoMapper: VotingDtoMapper) {}

  map(obj: VotingClosedEvent): ManagerClosedVotingEventDto {
    return {
      voting: this.votingtDtoMapper.makeDto(obj.voting()),
      time: obj.time.toString(),
    }
  }
}
