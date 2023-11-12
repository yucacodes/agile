import type { MeetingParticipantRole } from "@domain";

export interface MeetingAuthInformationDto {
  meetingId: string;
  participantId: string;
  participantName: string;
  roles: readonly  MeetingParticipantRole[];
}
