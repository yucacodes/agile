import { MeetingAuthInformationDto } from "./meeting-auth-information-dto";
import { MeetingDto } from "./meeting-dto";

export interface MeetingWithAuthInformationDto {
  meeting: MeetingDto
  authInfo: MeetingAuthInformationDto
}
