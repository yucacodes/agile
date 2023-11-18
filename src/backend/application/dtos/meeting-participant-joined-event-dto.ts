import type { MeetingParticipantJoinedEvent } from '@domain'

export interface MeetingParticipantJoinedEventDto {
  meetingParticipantId: string
  meetingParticipantName: string
  time: string
}

export class MeetingParticipantJoinedEventDtoMapper {
  makeDto(
    obj: MeetingParticipantJoinedEvent
  ): MeetingParticipantJoinedEventDto {
    const meetingParticipant = obj.meetingParticipant()
    return {
      meetingParticipantId: meetingParticipant.id(),
      meetingParticipantName: meetingParticipant.name(),
      time: obj.time().toISOString(),
    }
  }
}
