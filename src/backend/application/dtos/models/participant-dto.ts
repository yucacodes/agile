import { Participant } from '@domain'
import { dtoMapper } from '@framework/application'

export interface ParticipantDto {
  userId: string
  name: string
}

@dtoMapper({ model: Participant })
export class ParticipantDtoMapper {
  map(model: Participant): ParticipantDto {
    return {
      name: model.name(),
      userId: model.userId(),
    }
  }
}
