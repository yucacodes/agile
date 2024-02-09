import { MeetingsRepository, type Meeting } from '@domain'
import { singleton } from '@framework/injection'
import { repositoriesRedisClient as client } from '../db-connections/repositories-redis'
import { MeetingNoSqlDboMapper } from '../no-sql-dbos'

@singleton()
export class MeetingsRedisRepository extends MeetingsRepository {
  keyPrefix = 'meeting'

  constructor(private mapper: MeetingNoSqlDboMapper) {
    super()
  }

  async fetchById(id: string): Promise<Meeting | null> {
    const dbo = await client.json.get(`${this.keyPrefix}:${id}`)

    // Faltan los mapers

    return null
  }

  async fetchByIds(ids: string[]): Promise<Map<string, Meeting>> {
    const dbos = await Promise.all(
      ids.map((id) => client.json.get(`${this.keyPrefix}:${id}`))
    )
    // Faltan los mapers
    return new Map()
  }

  protected async persistNewEntities(entities: Meeting[]): Promise<void> {
    const dbos: any[] = this.mapper.makeArrayDbo(entities)

    await Promise.all(
      dbos.map((x) => client.json.set(`${this.keyPrefix}:${x.id}`, '$', x))
    )
  }

  protected async persistEntitiesUpdates(entities: Meeting[]): Promise<void> {
    return this.persistNewEntities(entities)
  }
}
