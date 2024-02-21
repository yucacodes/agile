import { ParticipantJoinedEvent } from '@domain'
import { dtoMapper } from '@framework'
import { ParticipantDtoMapper, type ParticipantDto } from './participant-dto'

export interface ParticipantJoinedEventDto {
  meetingId: string
  participant: ParticipantDto
  time: string
}

@dtoMapper({ model: ParticipantJoinedEvent })
export class ParticipantJoinedEventDtoMapper {
  constructor(private participantDtoMapper: ParticipantDtoMapper) {}

  map(obj: ParticipantJoinedEvent): ParticipantJoinedEventDto {
    return {
      meetingId: obj.meetingId(),
      participant: this.participantDtoMapper.map(obj.participant()),
      time: obj.time().toISOString(),
    }
  }
}
