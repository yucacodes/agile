import type { RefreshToken } from '@domain'
import { RefreshTokensRepository } from '@domain'
import { implementation } from '@yucacodes/es'
import { sqliteRepositoriesClient as client } from '../db-connections/sqlite-repositories'
import type { SqliteRefreshTokenDbo } from '../sqlite-dbos'
import { SqliteRefreshTokenDboMapper } from '../sqlite-dbos'

@implementation({ base: RefreshTokensRepository, singleton: true })
export class SqliteRefreshTokensRepository extends RefreshTokensRepository {
  private creatingTablePromise: Promise<void> | null
  constructor(private mapper: SqliteRefreshTokenDboMapper) {
    super()
    this.creatingTablePromise = new Promise((resolve) => {
      client.run(
        `
      CREATE TABLE IF NOT EXISTS refreshtokens (id TEXT PRIMARY KEY, data TEXT)`,
        () => {
          resolve()
          this.creatingTablePromise = null
        }
      )
    })
  }

  async findById(id: string): Promise<RefreshToken | null> {
    await this.waitForTable()
    const dbos = await new Promise<SqliteRefreshTokenDbo[]>((resolve, reject) => {
      client.all(
        `
        SELECT 
          id, 
          data
        FROM refreshtokens
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

  async saveNew(entity: RefreshToken): Promise<void> {
    await this.waitForTable()
    const dbo = this.mapper.map(entity)
    return new Promise<void>((resolve, reject) => {
      client.run(
        `INSERT INTO refreshtokens(id, data) VALUES(?,?)`,
        [dbo.id, dbo.data],
        function (err) {
          if (err) return reject(err)

          return resolve()
        }
      )
    })
  }

  async saveUpdate(entity: RefreshToken): Promise<void> {
    await this.waitForTable()
    const dbo = this.mapper.map(entity)
    return new Promise<void>((resolve, reject) => {
      client.run(
        `UPDATE refreshtokens SET data = ? WHERE id = ?`,
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
