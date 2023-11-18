import type { MeetingParticipant } from '@domain'
import { type EntityDto, EntityDtoMapper } from './entity-dto'
import { singleton } from 'tsyringe'

export interface MeetingParticipantDto extends EntityDto {
  name: string
}

@singleton()
export class MeetingParticipantDtoMapper {
  constructor(private entityDtoMapper: EntityDtoMapper) {}

  makeDto(obj: MeetingParticipant): MeetingParticipantDto {
    return {
      ...this.entityDtoMapper.makeDto(obj),
      name: obj.name(),
    }
  }

  makeMapDtos(map: Map<string, MeetingParticipant>): {
    [key: string]: MeetingParticipantDto
  } {
    const result: { [key: string]: MeetingParticipantDto } = {}
    for (const [key, obj] of map.entries()) result[key] = this.makeDto(obj)
    return result
  }
}
