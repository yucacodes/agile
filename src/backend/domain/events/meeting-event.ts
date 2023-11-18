export abstract class MeetingEvent {
  abstract meetingId(): string
  abstract originatingMeetingParticipantId(): string
}
