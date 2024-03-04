import type { MeetingDto } from './meeting-dto'
import type { SessionDataDto } from './session-data-dto'

export interface MeetingAndSessionDataDto {
  meeting: MeetingDto
  secret: string
  sessionData: SessionDataDto
}
