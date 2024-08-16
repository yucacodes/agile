import { IsNotEmpty, IsString } from '@yucacodes/es'

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
