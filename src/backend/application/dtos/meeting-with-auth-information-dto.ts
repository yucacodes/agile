import type { AuthInformationDto } from '@framework/application'
import type { MeetingDto } from './meeting-dto'

export interface MeetingWithAuthInformationDto {
  meeting: MeetingDto
  authInfo: AuthInformationDto
  secret: string
}
