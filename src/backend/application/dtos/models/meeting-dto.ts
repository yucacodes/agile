import { Meeting } from '@domain'

import {
  ParticipantDtoMapper,
  type ParticipantDto,
} from './participant-dto'
import { EntityDtoMapper, type EntityDto } from './entity-dto'
import { dtoMapper } from '@framework'

export interface MeetingDto extends EntityDto {
  participants: { [key: string]: ParticipantDto }
}

@dtoMapper({ model: Meeting })
export class MeetingDtoMapper {
  constructor(
    private entityMapper: EntityDtoMapper,
    private meetingParticipantDtoMapper: ParticipantDtoMapper
  ) {}

  map(obj: Meeting): MeetingDto {
    return {
      ...this.entityMapper.map(obj),
      participants: this.meetingParticipantDtoMapper.mapMap(obj.participants()),
    }
  }
}
