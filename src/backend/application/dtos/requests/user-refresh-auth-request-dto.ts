import { IsNotEmpty, IsString } from "@framework"

export interface UserRefreshAuthRequestDto {
  refreshTokenId: string
  secret: string
}


export class UserRefreshAuthRequestDtoValidator implements UserRefreshAuthRequestDto {
  @IsString()
  @IsNotEmpty()
  refreshTokenId: string = ''

  @IsString()
  @IsNotEmpty()
  secret: string = ''
}