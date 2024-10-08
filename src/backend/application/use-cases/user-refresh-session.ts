import type {
  AuthInformationDto,
  SessionDataDto,
  UserRefreshSessionRequestDto,
} from '@application'
import { UserRefreshSessionRequestDtoValidator } from '@application'
import { RefreshToken, RefreshTokensRepository } from '@domain'
import { Authorization, TimeProvider, useCase } from '@yucacodes/es'

@useCase({
  disableAuthValidation: true,
  requestValidator: UserRefreshSessionRequestDtoValidator,
})
export class UserRefreshSession {
  constructor(
    private refreshTokensRepository: RefreshTokensRepository,
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider
  ) {}
  async perform(req: UserRefreshSessionRequestDto): Promise<SessionDataDto> {
    const refreshToken = await this.refreshTokensRepository.findById(
      req.refreshTokenId
    )
    if (!refreshToken || !refreshToken.isValid(req.secret))
      throw new Error('Invalid token')
    const userId = refreshToken.userId()
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
