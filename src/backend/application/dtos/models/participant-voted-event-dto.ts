import { ParticipantVotedEvent } from '@domain'
import { dtoMapper } from '@framework'

export interface ParticipantVotedEventDto {
  meetingId: string
  votingId: string
  participantUserId: string
  votingClosed: boolean
}

@dtoMapper({ model: ParticipantVotedEvent })
export class ParticipantVotedEventDtoMapper {
  map(obj: ParticipantVotedEvent): ParticipantVotedEventDto {
    return {
      meetingId: obj.meetingId(),
      votingId: obj.votingId(),
      participantUserId: obj.participant().userId(),
      votingClosed: obj.isVotingClosed(),
    }
  }
}
