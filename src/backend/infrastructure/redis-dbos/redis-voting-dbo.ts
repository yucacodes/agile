import { Voting } from '@domain'
import { DboCollectionsMapper, TimeProvider, dboMapper } from '@framework'
import type { RedisEntityDbo } from './redis-entity-dbo'
import { RedisEntityDboMapperHelper } from './redis-entity-dbo'
import type { RedisParticipantDbo } from './redis-participant-dbo'
import { RedisParticipantDboMapper } from './redis-participant-dbo'

export interface RedisVotingDbo extends RedisEntityDbo {
  timeLimit: number
  closedAt?: number
  participantVotes: { [key: string]: number }
  participants: { [key: string]: RedisParticipantDbo }
}

@dboMapper({ model: Voting })
export class RedisVotingDboMapper extends DboCollectionsMapper {
  constructor(
    private timeProvider: TimeProvider,
    private entityMapper: RedisEntityDboMapperHelper,
    private participantMapper: RedisParticipantDboMapper
  ) {
    super()
  }

  map(obj: Voting): RedisVotingDbo {
    const props = obj['props']
    return {
      ...this.entityMapper.map(obj),
      timeLimit: props.timeLimit.getTime(),
      closedAt: props.closedAt && props.closedAt.getTime(),
      participantVotes: Object.fromEntries(props.participantVotes),
      participants: this.participantMapper.mapMap(props.participants),
    }
  }

  revert(dbo: RedisVotingDbo): Voting {
    return new Voting(
      {
        ...this.entityMapper.revertProps(dbo),
        timeLimit: new Date(dbo.timeLimit),
        closedAt:
          dbo.closedAt == undefined ? undefined : new Date(dbo.closedAt),
        participants: this.participantMapper.revertMap(dbo.participants),
        participantVotes: new Map(
          Object.keys(dbo.participantVotes).map((key) => [
            key,
            dbo.participantVotes[key],
          ])
        ),
      },
      this.timeProvider
    )
  }
}
