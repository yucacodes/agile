import { IsNotEmpty, IsString } from 'class-validator'

export interface UserStartVotingRequestDto {
  meetingId: string
}

export class UserStartVotingRequestDtoValidator
  implements UserStartVotingRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
