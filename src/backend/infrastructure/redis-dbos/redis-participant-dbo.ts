import { Participant } from '@domain'
import { DboCollectionsMapper, dboMapper } from '@yucacodes/es'

export interface RedisParticipantDbo {
  userId: string
  name: string
  isManager: boolean
  isConnected: boolean
}

@dboMapper({ model: Participant })
export class RedisParticipantDboMapper extends DboCollectionsMapper {
  
  map(obj: Participant): RedisParticipantDbo {
    const props = obj['props']
    return {
      userId: props.userId,
      name: props.name,
      isManager: props.isManager,
      isConnected: props.isConnected,
    }
  }

  revert(dbo: RedisParticipantDbo): Participant {
    return new Participant({
      userId: dbo.userId,
      name: dbo.name,
      isManager: dbo.isManager,
      isConnected: dbo.isConnected,
    })
  }
}
