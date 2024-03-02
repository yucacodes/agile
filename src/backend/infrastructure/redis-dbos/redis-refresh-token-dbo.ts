import type { RedisEntityDbo } from './redis-entity-dbo'

export interface RedisRefreshTokenDbo extends RedisEntityDbo {
  secretHash: string
  expiresAt: number
  userId: string
  roles: string[]
}
