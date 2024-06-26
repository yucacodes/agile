import { IsNotEmpty, IsString } from '@framework'

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
