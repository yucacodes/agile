import { type Participant } from '@domain'
import { NoSqlDboMapper } from '@framework/infrastructure'

export interface MeetingParticipantNoSqlDbo {}

export class MeetingParticipantNoSqlDboMapper extends NoSqlDboMapper<
  Participant,
  MeetingParticipantNoSqlDbo
> {
  makeDbo(obj: Participant): MeetingParticipantNoSqlDbo {
    throw new Error('Method not implemented.')
  }
  loadDbo(dbo: MeetingParticipantNoSqlDbo): Participant {
    throw new Error('Method not implemented.')
  }
}
