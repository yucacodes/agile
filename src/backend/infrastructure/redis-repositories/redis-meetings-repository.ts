import { MeetingsRepository, type Meeting } from '@domain'
import { implementation } from '@framework'
import { repositoriesRedisClient as client } from '../db-connections/repositories-redis'
import { RedisMeetingDboMapper } from '../redis-dbos'

@implementation({ base: MeetingsRepository, singleton: true })
export class RedisMeetingsRepository extends MeetingsRepository {
  constructor(private mapper: RedisMeetingDboMapper) {
    super()
    if (!client.isReady) client.connect()
  }

  async findById(id: string): Promise<Meeting | null> {
    const dbo = (await client.json.get(this.redisKey(id))) as any
    if (dbo == null) return null
    return this.mapper.revert(dbo)
  }

  async findByIds(ids: string[]): Promise<Map<string, Meeting>> {
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

  async saveNew(entity: Meeting): Promise<void> {
    const dbo = this.mapper.map(entity) as any
    client.json.set(this.redisKey(entity.id()), '$', dbo)
  }

  async saveUpdate(entity: Meeting): Promise<void> {
    return this.saveNew(entity)
  }

  private redisKey(id: string) {
    return `$meeting:${id}`
  }
}
