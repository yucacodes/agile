import type { MeetingParticipantJoinedEvent } from '@domain'
import { singleton } from '@framework/injection'

export interface MeetingParticipantJoinedEventDto {
  meetingParticipantId: string
  meetingParticipantName: string
  time: string
}

@singleton()
export class MeetingParticipantJoinedEventDtoMapper {
  makeDto(
    obj: MeetingParticipantJoinedEvent
  ): MeetingParticipantJoinedEventDto {
    const meetingParticipant = obj.meetingParticipant()
    return {
      meetingParticipantId: meetingParticipant.meetingId(),
      meetingParticipantName: meetingParticipant.name(),
      time: obj.time().toISOString(),
    }
  }
}
