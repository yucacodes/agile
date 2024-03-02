import { IsNotEmpty, IsString } from "@framework"

export interface UserRefreshSessionRequestDto {
  refreshTokenId: string
  secret: string
}


export class UserRefreshSessionRequestDtoValidator implements UserRefreshSessionRequestDto {
  @IsString()
  @IsNotEmpty()
  refreshTokenId: string = ''

  @IsString()
  @IsNotEmpty()
  secret: string = ''
}