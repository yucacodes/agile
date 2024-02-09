import { type MeetingParticipant } from '@domain'
import { NoSqlDboMapper } from '@framework/infrastructure'

export interface MeetingParticipantNoSqlDbo {}

export class MeetingParticipantNoSqlDboMapper extends NoSqlDboMapper<
  MeetingParticipant,
  MeetingParticipantNoSqlDbo
> {
  makeDbo(obj: MeetingParticipant): MeetingParticipantNoSqlDbo {
    throw new Error('Method not implemented.')
  }
  loadDbo(dbo: MeetingParticipantNoSqlDbo): MeetingParticipant {
    throw new Error('Method not implemented.')
  }
}
