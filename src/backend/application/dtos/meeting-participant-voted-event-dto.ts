import type { MeetingParticipantVotedEvent } from '@domain'
import type { TimeManager } from '@framework/domain'
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
    obj: MeetingParticipantVotedEvent,
    timeManager: TimeManager
  ): MeetingParticipantVotedEventDto {
    const meetingParticipant = obj.meetingParticipant()
    return {
      meetingParticipantId: meetingParticipant.meetingId(),
      meetingParticipantName: meetingParticipant.name(),
      votingId: obj.voting(),
      votingClosed: obj.votingClosed(timeManager),
    }
  }
}
