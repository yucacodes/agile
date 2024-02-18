import type { MeetingDto } from './meeting-dto'

export interface MeetingAndSecretDto {
  meeting: MeetingDto
  secret: string
}
