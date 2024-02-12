import { MeetingsRepository, type Meeting } from '@domain'
import { singleton } from '@framework/injection'
import { repositoriesRedisClient as client } from '../db-connections/repositories-redis'
import { MeetingDboMapper } from '../no-sql-dbos'

@singleton()
export class MeetingsRedisRepository extends MeetingsRepository {
  constructor(private mapper: MeetingDboMapper) {
    super()
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

  protected async persistNewEntities(entities: Meeting[]): Promise<void> {
    const dbos = this.mapper.makeArrayDbo(entities) as any[]
    await Promise.all(
      dbos.map((x) => client.json.set(this.redisKey(x.id), '$', x))
    )
  }

  protected async persistEntitiesUpdates(entities: Meeting[]): Promise<void> {
    return this.persistNewEntities(entities)
  }

  private redisKey(id: string) {
    return `$meeting:${id}`
  }
}
