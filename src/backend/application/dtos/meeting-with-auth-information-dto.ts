import type { AuthInformationDto } from './auth-information-dto'
import type { MeetingDto } from './meeting-dto'

export interface MeetingWithAuthInformationDto {
  meeting: MeetingDto
  authInfo: AuthInformationDto
}
