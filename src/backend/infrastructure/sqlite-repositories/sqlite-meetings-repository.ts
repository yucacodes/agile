import type { Meeting } from '@domain'
import { MeetingsRepository } from '@domain'
import { implementation } from '@yucacodes/es'
import { sqliteRepositoriesClient as client } from '../db-connections/sqlite-repositories'
import type { SqliteMeetingDbo } from '../sqlite-dbos'
import { SqliteMeetingDboMapper } from '../sqlite-dbos'

@implementation({ base: MeetingsRepository, singleton: true })
export class SqliteMeetingsRepository extends MeetingsRepository {
  private creatingTablePromise: Promise<void> | null
  constructor(private mapper: SqliteMeetingDboMapper) {
    super()
    this.creatingTablePromise = new Promise((resolve) => {
      client.run(
        `
      CREATE TABLE IF NOT EXISTS meetings (id TEXT PRIMARY KEY, data TEXT)`,
        () => {
          resolve()
          this.creatingTablePromise = null
        }
      )
    })
  }

  async findById(id: string): Promise<Meeting | null> {
    await this.waitForTable()
    const dbos = await new Promise<SqliteMeetingDbo[]>((resolve, reject) => {
      client.all(
        `
        SELECT 
          id, 
          data
        FROM meetings
        WHERE id = ?
        LIMIT 1
      `,
        [id],
        (err, rows) => {
          if (err) return reject(err)
          return resolve(rows as any)
        }
      )
    })
    if (dbos.length === 0) return null
    return this.mapper.revert(dbos[0])
  }

  async saveNew(entity: Meeting): Promise<void> {
    await this.waitForTable()
    const dbo = this.mapper.map(entity)
    return new Promise<void>((resolve, reject) => {
      client.run(
        `INSERT INTO meetings(id, data) VALUES(?,?)`,
        [dbo.id, dbo.data],
        function (err) {
          if (err) return reject(err)

          return resolve()
        }
      )
    })
  }

  async saveUpdate(entity: Meeting): Promise<void> {
    await this.waitForTable()
    const dbo = this.mapper.map(entity)
    return new Promise<void>((resolve, reject) => {
      client.run(
        `UPDATE meetings SET data = ? WHERE id = ?`,
        [dbo.data, dbo.id],
        function (err) {
          if (err) return reject(err)
          return resolve()
        }
      )
    })
  }

  private async waitForTable() {
    if (this.creatingTablePromise) await this.creatingTablePromise
  }
}
