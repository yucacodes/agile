import { Meeting } from '@domain'
import {
  EntityNoSqlDboMapper,
  NoSqlDboMapper,
  type EntityNoSqlDbo,
} from '@framework/infrastructure'
import { singleton } from 'tsyringe'
import {
  MeetingParticipantNoSqlDboMapper,
  type MeetingParticipantNoSqlDbo,
} from './meeting-participant-no-sql-dbo'
import { VotingNoSqlDboMapper, type VotingNoSqlDbo } from './voting-no-sql-dbo'

export interface MeetingNoSqlDbo extends EntityNoSqlDbo {
  secretHash: string
  participants: { [key: string]: MeetingParticipantNoSqlDbo }
  votings: VotingNoSqlDbo[]
}

@singleton()
export class MeetingNoSqlDboMapper extends NoSqlDboMapper<
  Meeting,
  MeetingNoSqlDbo
> {
  constructor(
    private entityMapper: EntityNoSqlDboMapper,
    private participantMapper: MeetingParticipantNoSqlDboMapper,
    private votingMapper: VotingNoSqlDboMapper
  ) {
    super()
  }

  makeDbo(obj: Meeting): MeetingNoSqlDbo {
    const props = this.modelProps(obj)

    return {
      ...this.entityMapper.makeDbo(obj),
      secretHash: props.secretHash,
      participants: this.participantMapper.makeMapDbo(props.participants),
      votings: this.votingMapper.makeArrayDbo(props.votings),
    }
  }

  loadDbo(dbo: MeetingNoSqlDbo): Meeting {
    return new Meeting({
      ...this.entityMapper.loadBaseProps(dbo),
      secretHash: dbo.secretHash,
      participants: this.participantMapper.loadMapDbo(dbo.participants),
      votings: this.votingMapper.loadArrayDbo(dbo.votings),
    })
  }
}
