import { RefreshToken } from '@domain'
import { DboCollectionsMapper, dboMapper, TimeProvider } from '@framework'
import type { RedisEntityDbo } from './redis-entity-dbo'
import { RedisEntityDboMapperHelper } from './redis-entity-dbo'

export interface RedisRefreshTokenDbo extends RedisEntityDbo {
  secretHash: string
  expiresAt: number
  userId: string
  roles: string[]
}

@dboMapper({ model: RefreshToken })
export class RedisRefreshTokenDboMapper extends DboCollectionsMapper {
  constructor(
    private timeProvider: TimeProvider,
    private entityMapper: RedisEntityDboMapperHelper
  ) {
    super()
  }

  map(obj: RefreshToken): RedisRefreshTokenDbo {
    const props = obj['props']
    return {
      ...this.entityMapper.map(obj),
      expiresAt: props.expiresAt.getTime(),
      secretHash: props.secretHash,
      userId: props.userId,
      roles: props.roles,
    }
  }

  revert(dbo: RedisRefreshTokenDbo): RefreshToken {
    return new RefreshToken(
      {
        ...this.entityMapper.revertProps(dbo),
        expiresAt: new Date(dbo.expiresAt),
        secretHash: dbo.secretHash,
        userId: dbo.userId,
        roles: dbo.roles,
      },
      this.timeProvider
    )
  }
}
