import type { MeetingParticipantRole } from "@domain";

export interface AuthRequestDto {
  meetingId: string;
  meetingParticipantId: string;
  roles: readonly MeetingParticipantRole[];
}
