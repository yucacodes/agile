import { IsNotEmpty, IsString } from '@framework'

export interface UserCreateMeetingRequestDto {
  name: string
}

export class UserCreateMeetingRequestDtoValidator
  implements UserCreateMeetingRequestDto
{
  @IsString()
  @IsNotEmpty()
  name: string = ''
}
