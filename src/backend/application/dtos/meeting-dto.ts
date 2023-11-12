import type { Meeting } from "@domain";
import type { EntityDtoMapper, EntityDto } from "./entity-dto";
import type { MeetingParticipantDto, MeetingParticipantDtoMapper } from "./meeting-participant-dto";

export interface MeetingDto extends EntityDto {
  participants: { [key: string]: MeetingParticipantDto },
}

export class MeetingDtoMapper {

  constructor(
    private entityDtoMapper: EntityDtoMapper,
    private meetingParticipantDtoMapper: MeetingParticipantDtoMapper,
  ) { }

  makeDto(obj: Meeting): MeetingDto {
    return {
      ...this.entityDtoMapper.makeDto(obj),
      participants: this.meetingParticipantDtoMapper.makeMapDtos(obj.participants()),
    }
  }
}

