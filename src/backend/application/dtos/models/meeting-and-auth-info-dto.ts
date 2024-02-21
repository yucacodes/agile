import type { AuthInformationDto } from './auth-information-dto'
import type { MeetingDto } from './meeting-dto'

export interface MeetingAndAuthInfoDto {
  meeting: MeetingDto
  secret: string
  authInfo: AuthInformationDto
}
