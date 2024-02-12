import type { Meeting } from '@domain'
import { singleton } from '@framework/injection'
import { EntityDtoMapper, type EntityDto } from '@framework/application'
import {
  MeetingParticipantDtoMapper,
  type MeetingParticipantDto,
} from './meeting-participant-dto'
import { dboMapper } from '@framework/infrastructure'

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
