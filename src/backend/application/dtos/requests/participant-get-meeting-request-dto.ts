import { IsNotEmpty, IsString } from '@framework'

export interface ParticipantGetMeetingRequestDto {
  id: string
}

export class ParticipantGetMeetingRequestDtoValidator
  implements ParticipantGetMeetingRequestDto
{
  @IsString()
  @IsNotEmpty()
  id: string = ''
}
