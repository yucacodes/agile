import { IsNotEmpty, IsString } from '@yucacodes/es'

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
