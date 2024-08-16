import { IsNotEmpty, IsString } from "@yucacodes/es"

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