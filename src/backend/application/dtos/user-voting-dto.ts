import { IsNotEmpty, IsString } from 'class-validator'

export interface UserVotingDto {
  meetingId: string
  votingId: string
  point: number
  participantId: string
}

export class UserVotingDtoValidator implements UserVotingDto {
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''

  @IsString()
  @IsNotEmpty()
  votingId: string = ''

  @IsString()
  @IsNotEmpty()
  point: number = 0

  @IsString()
  @IsNotEmpty()
  participantId: string = ''
}
