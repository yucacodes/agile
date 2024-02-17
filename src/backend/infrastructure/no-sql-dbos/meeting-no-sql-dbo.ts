import { Meeting } from '@domain'

import { TimeProvider } from '@framework/domain'
import { dboMapper } from '@framework/infrastructure'
import type { EntityNoSqlDbo } from './entity-no-sql-dbo'
import { EntityNoSqlDboMapperHelper } from './entity-no-sql-dbo'
import {
  ParticipantNoSqlDboMapper,
  type ParticipantNoSqlDbo,
} from './meeting-participant-no-sql-dbo'
import { VotingNoSqlDboMapper, type VotingNoSqlDbo } from './voting-no-sql-dbo'

export interface MeetingNoSqlDbo extends EntityNoSqlDbo {
  secretHash: string
  participants: { [key: string]: ParticipantNoSqlDbo }
  votings: { [key: string]: VotingNoSqlDbo }
}

@dboMapper({ model: Meeting })
export class MeetingDboMapper {
  constructor(
    private timeProvider: TimeProvider,
    private entityMapper: EntityNoSqlDboMapperHelper,
    private participantMapper: ParticipantNoSqlDboMapper,
    private votingMapper: VotingNoSqlDboMapper
  ) {}

  map(model: Meeting): MeetingNoSqlDbo {
    const props = model['props']
    return {
      ...this.entityMapper.map(model),
      secretHash: props.secretHash,
      participants: this.participantMapper.mapMap(props.participants),
      votings: this.votingMapper.mapMap(props.votings),
    }
  }

  revert(dbo: MeetingNoSqlDbo): Meeting {
    return new Meeting(
      {
        ...this.entityMapper.revertProps(dbo),
        secretHash: dbo.secretHash,
        participants: this.participantMapper.revertMap(dbo.participants),
        votings: this.votingMapper.revertMap(dbo.votings),
      },
      this.timeProvider
    )
  }
}
