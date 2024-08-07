import { IsNotEmpty, IsString } from '@framework'

export interface ManagerRoleRequestDto {
  meetingId: string
}

export class ManagerRoleRequestDtoValidator implements ManagerRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  meetingId: string = ''
}
