import { Meeting } from '@domain'

import { TimeProvider } from '@framework'
import { dboMapper } from '@framework'
import type { RedisEntityDbo } from './redis-entity-dbo'
import { RedisEntityDboMapperHelper } from './redis-entity-dbo'
import {
  RedisParticipantDboMapper,
  type RedisParticipantDbo,
} from './redis-participant-dbo'
import { RedisVotingDboMapper, type RedisVotingDbo } from './redis-voting-dbo'

export interface RedisMeetingDbo extends RedisEntityDbo {
  secretHash: string
  participants: { [key: string]: RedisParticipantDbo }
  votings: { [key: string]: RedisVotingDbo }
}

@dboMapper({ model: Meeting })
export class RedisMeetingDboMapper {
  constructor(
    private timeProvider: TimeProvider,
    private entityMapper: RedisEntityDboMapperHelper,
    private participantMapper: RedisParticipantDboMapper,
    private votingMapper: RedisVotingDboMapper
  ) {}

  map(model: Meeting): RedisMeetingDbo {
    const props = model['props']
    return {
      ...this.entityMapper.map(model),
      secretHash: props.secretHash,
      participants: this.participantMapper.mapMap(props.participants),
      votings: this.votingMapper.mapMap(props.votings),
    }
  }

  revert(dbo: RedisMeetingDbo): Meeting {
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
