import type { ParticipantJoinedEvent } from '@domain'
import { singleton } from '@framework/injection'

export interface MeetingParticipantJoinedEventDto {
  meetingParticipantId: string
  meetingParticipantName: string
  time: string
}

@singleton()
export class MeetingParticipantJoinedEventDtoMapper {
  makeDto(
    obj: ParticipantJoinedEvent
  ): MeetingParticipantJoinedEventDto {
    const meetingParticipant = obj.participant()
    return {
      meetingParticipantId: meetingParticipant.meetingId(),
      meetingParticipantName: meetingParticipant.name(),
      time: obj.time().toISOString(),
    }
  }
}
