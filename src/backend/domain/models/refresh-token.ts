import type { TimeProvider } from '@yucacodes/es'
import {
  hashPasswordSync,
  secureSecret,
  verifyPasswordSync,
} from '@yucacodes/es'
import type { EntityProps } from '../core'
import { Entity } from '../core'

export interface RefreshTokenFactoryProps {
  userId: string
  roles: string[]
  expiresAt?: Date
  timeProvider: TimeProvider
}

export interface RefreshTokenAndSecret {
  refreshToken: RefreshToken
  secret: string
}

export interface RefreshTokenProps extends EntityProps {
  secretHash: string
  expiresAt: Date
  userId: string
  roles: string[]
}

export class RefreshToken extends Entity<RefreshTokenProps> {
  private static DEFAULT_EXPIRATION_MINUTES = 60
  private static SECRET_BYTES = 32
  private static SECRET_SALT_ROUNDS = 10

  static factory(props: RefreshTokenFactoryProps): RefreshTokenAndSecret {
    const secret = secureSecret(this.SECRET_BYTES)
    const refreshToken = new RefreshToken(
      {
        ...this.factoryEntityProps(props.timeProvider),
        secretHash: hashPasswordSync(secret),
        expiresAt:
          props.expiresAt ??
          props.timeProvider.minutesLater(this.DEFAULT_EXPIRATION_MINUTES),
        userId: props.userId,
        roles: [...props.roles],
      },
      props.timeProvider
    )
    return { refreshToken, secret }
  }

  isValid(secret: string): boolean {
    return (
      !this.isDiscarded() && !this.isExpired() && this.isValidSecret(secret)
    )
  }

  userId() {
    return this.props.userId
  }

  roles(): string[] {
    return [...this.props.roles]
  }

  // Private methods

  private isExpired(): boolean {
    return this.timeProvider.now().getTime() >= this.props.expiresAt.getTime()
  }

  private isValidSecret(secret: string): boolean {
    return verifyPasswordSync(secret, this.props.secretHash)
  }
}
