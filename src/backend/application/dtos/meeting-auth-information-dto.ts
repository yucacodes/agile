import type { MeetingParticipantRole } from '@domain'

export interface MeetingAuthInformationDto {
  meetingId: string
  meetingParticipantId: string
  meetingParticipantName: string
  roles: readonly MeetingParticipantRole[]
}
