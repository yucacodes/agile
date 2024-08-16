import { RefreshToken } from '@domain'
import { dboMapper } from '@yucacodes/es'
import { RedisRefreshTokenDboMapper } from '../redis-dbos'

export interface SqliteRefreshTokenDbo {
  id: string
  data: string
}

@dboMapper({ model: RefreshToken })
export class SqliteRefreshTokenDboMapper {
  constructor(private redisRefreshTokenDboMapper: RedisRefreshTokenDboMapper) {}

  map(model: RefreshToken): SqliteRefreshTokenDbo {
    return {
      id: model.id(),
      data: JSON.stringify(this.redisRefreshTokenDboMapper.map(model)),
    }
  }

  revert(dbo: SqliteRefreshTokenDbo): RefreshToken {
    return this.redisRefreshTokenDboMapper.revert(JSON.parse(dbo.data))
  }
}
