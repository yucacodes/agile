import { ParticipantVotedEvent } from '@domain'
import { dtoMapper } from '@framework/application'

export interface MeetingParticipantVotedEventDto {
  meetingId: string
  votingId: string
  participantUserId: string
  votingClosed: boolean
}

@dtoMapper({ model: ParticipantVotedEvent })
export class MeetingParticipantVotedEventDtoMapper {
  map(obj: ParticipantVotedEvent): MeetingParticipantVotedEventDto {
    return {
      meetingId: obj.meetingId(),
      votingId: obj.votingId(),
      participantUserId: obj.participant().userId(),
      votingClosed: obj.isVotingClosed(),
    }
  }
}
