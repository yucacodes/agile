import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export interface UserVotingRequestDto {
  meetingId: string
  votingId: string
  point: number
}

export class UserVotingRequestDtoValidator implements UserVotingRequestDto {
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''

  @IsString()
  @IsNotEmpty()
  votingId: string = ''

  @IsNumber()
  @Min(1)
  @Max(100)
  point: number = 0
}
