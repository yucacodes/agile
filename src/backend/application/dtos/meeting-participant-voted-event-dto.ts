import type { ParticipantVotedEvent } from '@domain'
import type { TimeProvider } from '@framework/domain'
import { singleton } from '@framework/injection'

export interface MeetingParticipantVotedEventDto {
  meetingParticipantId: string
  meetingParticipantName: string
  votingId: string
  votingClosed: boolean
}

@singleton()
export class MeetingParticipantVotedEventDtoMapper {
  makeDto(
    obj: ParticipantVotedEvent,
    timeManager: TimeProvider
  ): MeetingParticipantVotedEventDto {
    const meetingParticipant = obj.participant()
    return {
      meetingParticipantId: meetingParticipant.meetingId(),
      meetingParticipantName: meetingParticipant.name(),
      votingId: obj.votingId(),
      votingClosed: obj.votingClosed(timeManager),
    }
  }
}
