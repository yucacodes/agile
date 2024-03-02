import type {
  AuthInformationDto,
  SessionDataDto,
  UserRefreshAuthRequestDto,
} from '@application'
import { UserRefreshAuthRequestDtoValidator } from '@application'
import { RefreshToken, RefreshTokensRepository } from '@domain'
import { Authorization, TimeProvider, useCase } from '@framework'

@useCase({
  disableAuthValidation: true,
  requestValidator: UserRefreshAuthRequestDtoValidator,
})
export class UserRefreshAuth {
  constructor(
    private refreshTokensRepository: RefreshTokensRepository,
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider
  ) {}
  async perform(req: UserRefreshAuthRequestDto): Promise<SessionDataDto> {
    const refreshToken = await this.refreshTokensRepository.findById(
      req.refreshTokenId
    )
    if (!refreshToken || !refreshToken.isValid(req.secret))
      throw new Error('Invalid token')
    const userId = refreshToken.id()
    const roles = refreshToken.roles()

    const { refreshToken: newRefreshToken, secret: newSecret } =
      RefreshToken.factory({
        roles,
        userId,
        timeProvider: this.timeProvider,
      })

    refreshToken.discard()
    await this.refreshTokensRepository.saveUpdate(refreshToken)
    await this.refreshTokensRepository.saveNew(newRefreshToken)

    this.authorization.set({ userId, roles })
    return {
      refreshTokenId: newRefreshToken.id(),
      refreshTokenSecret: newSecret,
      userId,
      roles,
    }
  }
}
