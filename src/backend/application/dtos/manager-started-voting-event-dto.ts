import { type VotingStartedEvent } from '@domain'
import { singleton } from '@framework/injection'
import { MeetingParticipantDtoMapper } from './meeting-participant-dto'

export interface ManagerStartedVotingEventDto {
  votingId: string
  time: string
}

@singleton()
export class ManagerStartedVotingEventDtoMapper {
  constructor(
    private meetingParticipantDtoMapper: MeetingParticipantDtoMapper
  ) {}

  makeDto(obj: VotingStartedEvent): ManagerStartedVotingEventDto {
    return {
      votingId: obj.voting(),
      time: obj.time.toString(),
    }
  }
}
