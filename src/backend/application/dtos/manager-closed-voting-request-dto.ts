import { IsNotEmpty, IsString } from 'class-validator'

export interface ManagerClosedVotingRequestDto {
  meetingId: string
  votingId: string
}

export class ManagerClosedVotingRequestDtoValidator
  implements ManagerClosedVotingRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''

  @IsString()
  @IsNotEmpty()
  votingId: string = ''
}
