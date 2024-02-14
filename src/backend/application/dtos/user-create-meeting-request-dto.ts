import { IsNotEmpty, IsString } from 'class-validator'

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
