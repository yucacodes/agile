import type { RefreshToken } from '@domain'
import { RefreshTokensRepository } from '@domain'
import { implementation } from '@yucacodes/es'
import { redisRepositoriesClient as client } from '../db-connections/redis-repositories'
import { RedisRefreshTokenDboMapper } from '../redis-dbos'

@implementation({ base: RefreshTokensRepository, singleton: true })
export class RedisRefreshTokensRepository extends RefreshTokensRepository {
  constructor(private mapper: RedisRefreshTokenDboMapper) {
    super()
    if (!client.isReady) client.connect()
  }

  async findById(id: string): Promise<RefreshToken | null> {
    const dbo = (await client.json.get(this.redisKey(id))) as any
    if (dbo == null) return null
    return this.mapper.revert(dbo)
  }

  async findByIds(ids: string[]): Promise<Map<string, RefreshToken>> {
    let dbos = (await Promise.all(
      ids.map((id) => client.json.get(this.redisKey(id)))
    )) as any[]
    dbos = dbos.filter((x) => x != null)
    return new Map(
      dbos.map((x) => {
        const entity = this.mapper.revert(x)
        return [entity.id(), entity]
      })
    )
  }

  async saveNew(entity: RefreshToken): Promise<void> {
    const dbo = this.mapper.map(entity) as any
    client.json.set(this.redisKey(entity.id()), '$', dbo)
  }

  async saveUpdate(entity: RefreshToken): Promise<void> {
    return this.saveNew(entity)
  }

  private redisKey(id: string) {
    return `$refreshTokens:${id}`
  }
}
