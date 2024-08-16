import { IsNotEmpty, IsString } from '@yucacodes/es'

export interface ParticipantReconectToMeetingRequestDto {
  id: string
  meetingId: string
}

export class ParticipantReconectToMeetingRequestDtoValidator
  implements ParticipantReconectToMeetingRequestDto
{
  @IsString()
  @IsNotEmpty()
  id: string = ''

  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
