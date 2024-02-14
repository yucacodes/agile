import { IsNotEmpty, IsString } from 'class-validator'

export interface MeetingParticipantDisconnectedRequestDto {
  meetingId: string
}

export class MeetingParticipantDisconnectedRequestDtoValidator
  implements MeetingParticipantDisconnectedRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
