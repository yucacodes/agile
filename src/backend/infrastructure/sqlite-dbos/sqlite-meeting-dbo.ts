import { Meeting } from '@domain'
import { dboMapper } from '@framework'
import { RedisMeetingDboMapper } from '../redis-dbos'

export interface SqliteMeetingDbo {
  id: string
  data: string
}

@dboMapper({ model: Meeting })
export class SqliteMeetingDboMapper {
  constructor(private redisMeetingDboMapper: RedisMeetingDboMapper) {}

  map(model: Meeting): SqliteMeetingDbo {
    return {
      id: model.id(),
      data: JSON.stringify(this.redisMeetingDboMapper.map(model)),
    }
  }

  revert(dbo: SqliteMeetingDbo): Meeting {
    return this.redisMeetingDboMapper.revert(JSON.parse(dbo.data))
  }
}
