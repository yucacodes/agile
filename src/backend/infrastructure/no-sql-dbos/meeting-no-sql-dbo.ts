import { Meeting } from '@domain'
import {
  EntityNoSqlDboMapper,
  dboMapper,
  type EntityNoSqlDbo,
} from '@framework/infrastructure'

import {
  MeetingParticipantNoSqlDboMapper,
  type MeetingParticipantNoSqlDbo,
} from './meeting-participant-no-sql-dbo'
import { VotingNoSqlDboMapper, type VotingNoSqlDbo } from './voting-no-sql-dbo'
import { TimeProvider } from '@framework/domain'

export interface MeetingNoSqlDbo extends EntityNoSqlDbo {
  secretHash: string
  participants: { [key: string]: MeetingParticipantNoSqlDbo }
  votings: VotingNoSqlDbo[]
}

@dboMapper({ model: Meeting })
export class MeetingDboMapper {
  constructor(
    private timeProvider: TimeProvider,
    private entityMapper: EntityNoSqlDboMapper,
    private participantMapper: MeetingParticipantNoSqlDboMapper,
    private votingMapper: VotingNoSqlDboMapper
  ) {}

  map(model: Meeting): MeetingNoSqlDbo {
    throw ''
    // const props = this.modelProps(obj)

    // return {
    //   ...this.entityMapper.makeDbo(obj),
    //   secretHash: props.secretHash,
    //   participants: this.participantMapper.makeMapDbo(props.participants),
    //   votings: this.votingMapper.makeArrayDbo(props.votings),
    // }
  }

  revert(dbo: MeetingNoSqlDbo): Meeting {
    return new Meeting(
      {
        ...this.entityMapper.loadBaseProps(dbo),
        secretHash: dbo.secretHash,
        participants: this.participantMapper.loadMapDbo(dbo.participants),
        votings: this.votingMapper.loadArrayDbo(dbo.votings),
      },
      this.timeProvider
    )
  }
}
