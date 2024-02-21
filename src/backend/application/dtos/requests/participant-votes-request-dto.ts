import { IsNotEmpty, IsNumber, IsString, Max, Min } from '@framework'

export interface ParticipantVotesRequestDto {
  meetingId: string
  votingId: string
  point: number
}

export class ParticipantVotesRequestDtoValidator implements ParticipantVotesRequestDto {
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
