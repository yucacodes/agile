import { IsNotEmpty, IsString } from '@yucacodes/es'

export interface UserJoinMeetingRequestDto {
  name: string
  secret: string
  meetingId: string
}

export class UserJoinMeetingRequestDtoValidator
  implements UserJoinMeetingRequestDto
{
  @IsString()
  @IsNotEmpty()
  name: string = ''

  @IsString()
  @IsNotEmpty()
  secret: string = ''

  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
