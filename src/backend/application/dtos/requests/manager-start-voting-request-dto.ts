import { IsNotEmpty, IsString } from 'class-validator'

export interface ManagerStartVotingRequestDto {
  meetingId: string
}

export class ManagerStartVotingRequestDtoValidator
  implements ManagerStartVotingRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
