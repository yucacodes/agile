import { IsNotEmpty, IsString } from 'class-validator'

export interface ManagerStartedVotingRequestDto {
  meetingId: string
}

export class ManagerStartedVotingRequestDtoValidator
  implements ManagerStartedVotingRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
