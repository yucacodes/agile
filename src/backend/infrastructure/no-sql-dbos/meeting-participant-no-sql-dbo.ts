import { Participant } from '@domain'
import { dboMapper } from '@framework/infrastructure'

export interface ParticipantNoSqlDbo {}

@dboMapper({ model: Participant })
export class ParticipantNoSqlDboMapper {
  map(obj: Participant): ParticipantNoSqlDbo {
    throw new Error('Method not implemented.')
  }

  mapMap(map: Map<string, Participant>): {
    [key: string]: ParticipantNoSqlDbo
  } {
    throw new Error('Method not implemented.')
  }

  revert(dbo: ParticipantNoSqlDbo): Participant {
    throw new Error('Method not implemented.')
  }

  revertMap(dbo: {
    [key: string]: ParticipantNoSqlDbo
  }): Map<string, Participant> {
    throw new Error('Method not implemented.')
  }
}
