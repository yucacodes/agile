import { Voting } from '@domain'
import { dboMapper } from '@framework/infrastructure'
import type { RedisEntityDbo } from './redis-entity-dbo'

export interface RedisVotingDbo extends RedisEntityDbo {}

@dboMapper({ model: Voting })
export class RedisVotingDboMapper {
  map(obj: Voting): RedisVotingDbo {
    throw new Error('Method not implemented.')
  }

  mapMap(obj: Map<string, Voting>): { [key: string]: RedisVotingDbo } {
    throw new Error('Method not implemented.')
  }

  revert(dbo: RedisVotingDbo): Voting {
    throw new Error('Method not implemented.')
  }

  revertMap(dbo: { [key: string]: RedisVotingDbo }): Map<string, Voting> {
    throw new Error('Method not implemented.')
  }
}
