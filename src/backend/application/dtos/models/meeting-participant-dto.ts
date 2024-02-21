import { Participant } from '@domain'
import { dtoMapper } from '@framework'

export interface MeetingParticipantDto {
  userId: string
  name: string
  isManager: boolean
  isConnected: boolean
}

@dtoMapper({ model: Participant })
export class MeetingParticipantDtoMapper {
  map(obj: Participant): MeetingParticipantDto {
    return {
      userId: obj.userId(),
      name: obj.name(),
      isManager: obj.isManager(),
      isConnected: obj.isConnected(),
    }
  }

  mapMap(map: Map<string, Participant>): {
    [key: string]: MeetingParticipantDto
  } {
    const result: { [key: string]: MeetingParticipantDto } = {}
    for (const [key, obj] of map.entries()) result[key] = this.map(obj)
    return result
  }
}
