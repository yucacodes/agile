import { Participant } from '@domain'
import { CollectionsMapper, dtoMapper } from '@framework'

export interface ParticipantDto {
  userId: string
  name: string
  isManager: boolean
  isConnected: boolean
}

@dtoMapper({ model: Participant })
export class ParticipantDtoMapper extends CollectionsMapper {
  map(obj: Participant): ParticipantDto {
    return {
      userId: obj.userId(),
      name: obj.name(),
      isManager: obj.isManager(),
      isConnected: obj.isConnected(),
    }
  }
}
