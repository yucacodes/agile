import { IsNotEmpty, IsString } from 'class-validator'

export interface UserVotingDto {
  userId: string
  selectedOptionId: string
}

export class UserVotingDtoValidator implements UserVotingDto {
  @IsString()
  @IsNotEmpty()
  userId: string = ''

  @IsString()
  @IsNotEmpty()
  selectedOptionId: string = ''
}
