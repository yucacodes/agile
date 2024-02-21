import { Meeting } from '@domain'

import {
  MeetingParticipantDtoMapper,
  type MeetingParticipantDto,
} from './meeting-participant-dto'
import { EntityDtoMapper, type EntityDto } from './entity-dto'
import { dtoMapper } from '@framework/application'

export interface MeetingDto extends EntityDto {
  participants: { [key: string]: MeetingParticipantDto }
}

@dtoMapper({ model: Meeting })
export class MeetingDtoMapper {
  constructor(
    private entityMapper: EntityDtoMapper,
    private meetingParticipantDtoMapper: MeetingParticipantDtoMapper
  ) {}

  map(obj: Meeting): MeetingDto {
    return {
      ...this.entityMapper.map(obj),
      participants: this.meetingParticipantDtoMapper.mapMap(obj.participants()),
    }
  }
}
