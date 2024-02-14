import { IsNotEmpty, IsString } from 'class-validator'

export interface ManagerStarteVotingRequestDto {
  meetingId: string
}

export class ManagerStarteVotingRequestDtoValidator
  implements ManagerStarteVotingRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
