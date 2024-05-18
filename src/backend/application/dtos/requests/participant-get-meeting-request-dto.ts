import { IsNotEmpty, IsString } from '@framework'

export interface ParticipantGetMeetingRequestDto {
  id: string
  meetingId: string
}

export class ParticipantGetMeetingRequestDtoValidator
  implements ParticipantGetMeetingRequestDto
{
  @IsString()
  @IsNotEmpty()
  id: string = ''

  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
