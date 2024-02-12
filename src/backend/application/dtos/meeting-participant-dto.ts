import type { Participant } from '@domain'
import { singleton } from '@framework/injection'

export interface MeetingParticipantDto {
  userId: string
  name: string
  isManager: boolean
  isConnected: boolean
}

@singleton()
export class MeetingParticipantDtoMapper {
  makeDto(obj: Participant): MeetingParticipantDto {
    return {
      userId: obj.userId(),
      name: obj.name(),
      isManager: obj.isManager(),
      isConnected: obj.isConnected(),
    }
  }

  makeMapDtos(map: Map<string, Participant>): {
    [key: string]: MeetingParticipantDto
  } {
    const result: { [key: string]: MeetingParticipantDto } = {}
    for (const [key, obj] of map.entries()) result[key] = this.makeDto(obj)
    return result
  }
}
