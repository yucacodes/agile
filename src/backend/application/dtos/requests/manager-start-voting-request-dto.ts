import { IsNotEmpty, IsString } from '@framework'

export interface ManagerStartVotingRequestDto {
  meetingId: string
}

export class ManagerStartVotingRequestDtoValidator
  implements ManagerStartVotingRequestDto
{
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
