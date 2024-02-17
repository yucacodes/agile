import { Voting } from '@domain'
import { dboMapper } from '@framework/infrastructure'
import type { EntityNoSqlDbo } from './entity-no-sql-dbo'

export interface VotingNoSqlDbo extends EntityNoSqlDbo {}

@dboMapper({ model: Voting })
export class VotingNoSqlDboMapper {
  map(obj: Voting): VotingNoSqlDbo {
    throw new Error('Method not implemented.')
  }

  mapMap(obj: Map<string, Voting>): { [key: string]: VotingNoSqlDbo } {
    throw new Error('Method not implemented.')
  }

  revert(dbo: VotingNoSqlDbo): Voting {
    throw new Error('Method not implemented.')
  }

  revertMap(dbo: { [key: string]: VotingNoSqlDbo }): Map<string, Voting> {
    throw new Error('Method not implemented.')
  }
}
