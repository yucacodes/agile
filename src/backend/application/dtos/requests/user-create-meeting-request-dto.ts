import { IsNotEmpty, IsString } from '@yucacodes/es'

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
