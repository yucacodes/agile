import { IsNotEmpty, IsString } from 'class-validator'

export interface UserDisconnectedFromMeetingDto {
  meetingId: string
}

export class UserDisconnectedFromMeetingDtoValidator {
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
