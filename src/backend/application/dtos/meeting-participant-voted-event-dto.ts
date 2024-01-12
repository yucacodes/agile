import type { MeetingParticipantVotedEvent } from '@domain'
import type { TimeManager } from '@framework/domain'
import { singleton } from '@framework/injection'

export interface MeetingParticipantVotedEventDto {
  meetingParticipantId: string
  meetingParticipantName: string
  meetingParticipantVote: string
  votingIsOpen: boolean
}

@singleton()
export class MeetingParticipantVotedEventDtoMapper {
  makeDto(
    obj: MeetingParticipantVotedEvent,
    timeManager: TimeManager
  ): MeetingParticipantVotedEventDto {
    const meetingParticipant = obj.meetingParticipant()
    const meetingParticipantVote = obj.votinId()
    return {
      meetingParticipantId: meetingParticipant.meetingId(),
      meetingParticipantName: meetingParticipant.name(),
      meetingParticipantVote: meetingParticipantVote.id(),
      votingIsOpen: meetingParticipantVote.isOpen(timeManager),
    }
  }
}
