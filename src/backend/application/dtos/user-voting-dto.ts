import { IsNotEmpty, IsString } from 'class-validator'

export interface UserVotingRequestDto {
  meetingId: string
  votingId: string
  point: number
}

export class UserVotingDtoValidator implements UserVotingRequestDto {
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''

  @IsString()
  @IsNotEmpty()
  votingId: string = ''

  @IsString()
  @IsNotEmpty()
  point: number = 0
}
