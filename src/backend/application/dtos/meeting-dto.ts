import type { Meeting } from '@domain'
import { singleton } from '@injection'
import { EntityDtoMapper, type EntityDto } from './entity-dto'
import {
  MeetingParticipantDtoMapper,
  type MeetingParticipantDto,
} from './meeting-participant-dto'

export interface MeetingDto extends EntityDto {
  participants: { [key: string]: MeetingParticipantDto }
}

@singleton()
export class MeetingDtoMapper {
  constructor(
    private entityDtoMapper: EntityDtoMapper,
    private meetingParticipantDtoMapper: MeetingParticipantDtoMapper
  ) {}

  makeDto(obj: Meeting): MeetingDto {
    return {
      ...this.entityDtoMapper.makeDto(obj),
      participants: this.meetingParticipantDtoMapper.makeMapDtos(
        obj.participants()
      ),
    }
  }
}
