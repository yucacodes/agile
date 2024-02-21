import { IsNotEmpty, IsString } from 'class-validator'

export interface ManagerCloseVotingRequestDto {
  meetingId: string
  votingId: string
}

export class ManagerCloseVotingRequestDtoValidator
  implements ManagerCloseVotingRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''

  @IsString()
  @IsNotEmpty()
  votingId: string = ''
}
