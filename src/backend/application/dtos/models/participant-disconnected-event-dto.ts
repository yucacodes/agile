import { ParticipantDisconnectedEvent } from '@domain'
import { dtoMapper } from '@yucacodes/es'
import {
  ParticipantDtoMapper,
  type ParticipantDto,
} from './participant-dto'

export interface ParticipantDisconnectedEventDto {
  meetingParticipant: ParticipantDto
  time: string
}

@dtoMapper({ model: ParticipantDisconnectedEvent })
export class ParticipantDisconnectedEventDtoMapper {
  constructor(
    private meetingParticipantDtoMapper: ParticipantDtoMapper
  ) {}

  map(
    obj: ParticipantDisconnectedEvent
  ): ParticipantDisconnectedEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.map(
        obj.participant()
      ),
      time: obj.time.toString(),
    }
  }
}
