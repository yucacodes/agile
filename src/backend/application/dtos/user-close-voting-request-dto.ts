import { IsNotEmpty, IsString } from 'class-validator'

export interface UserCloseVotingRequestDto {
  meetingId: string
  votingId: string
}

export class UserCloseVotingRequestDtoValidator
  implements UserCloseVotingRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''

  @IsString()
  @IsNotEmpty()
  votingId: string = ''
}
