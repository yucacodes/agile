import { ParticipantJoinedEvent } from '@domain'
import { dtoMapper } from '@framework'
import { ParticipantDtoMapper, type ParticipantDto } from './participant-dto'

export interface MeetingParticipantJoinedEventDto {
  meetingId: string
  participant: ParticipantDto
  time: string
}

@dtoMapper({ model: ParticipantJoinedEvent })
export class MeetingParticipantJoinedEventDtoMapper {
  constructor(private participantDtoMapper: ParticipantDtoMapper) {}

  map(obj: ParticipantJoinedEvent): MeetingParticipantJoinedEventDto {
    return {
      meetingId: obj.meetingId(),
      participant: this.participantDtoMapper.map(obj.participant()),
      time: obj.time().toISOString(),
    }
  }
}
