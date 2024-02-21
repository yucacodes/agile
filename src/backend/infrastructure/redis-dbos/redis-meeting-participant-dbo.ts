import { Participant } from '@domain'
import { dboMapper } from '@framework'

export interface RedisParticipantDbo {}

@dboMapper({ model: Participant })
export class RedisParticipantDboMapper {
  map(obj: Participant): RedisParticipantDbo {
    throw new Error('Method not implemented.')
  }

  mapMap(map: Map<string, Participant>): {
    [key: string]: RedisParticipantDbo
  } {
    throw new Error('Method not implemented.')
  }

  revert(dbo: RedisParticipantDbo): Participant {
    throw new Error('Method not implemented.')
  }

  revertMap(dbo: {
    [key: string]: RedisParticipantDbo
  }): Map<string, Participant> {
    throw new Error('Method not implemented.')
  }
}
