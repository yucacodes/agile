import { Participant } from '@domain'
import { dtoMapper } from '@framework'

export interface ParticipantDto {
  userId: string
  name: string
  isManager: boolean
  isConnected: boolean
}

@dtoMapper({ model: Participant })
export class ParticipantDtoMapper {
  map(obj: Participant): ParticipantDto {
    return {
      userId: obj.userId(),
      name: obj.name(),
      isManager: obj.isManager(),
      isConnected: obj.isConnected(),
    }
  }

  mapMap(map: Map<string, Participant>): {
    [key: string]: ParticipantDto
  } {
    const result: { [key: string]: ParticipantDto } = {}
    for (const [key, obj] of map.entries()) result[key] = this.map(obj)
    return result
  }
}
