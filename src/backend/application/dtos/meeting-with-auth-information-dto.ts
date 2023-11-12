import type { MeetingAuthInformationDto } from "./meeting-auth-information-dto";
import type { MeetingDto } from "./meeting-dto";

export interface MeetingWithAuthInformationDto {
  meeting: MeetingDto
  authInfo: MeetingAuthInformationDto
}
