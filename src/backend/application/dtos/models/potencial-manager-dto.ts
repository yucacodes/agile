import { PotentialManagerEvent } from '@domain'
import { dtoMapper } from '@framework'
import { ParticipantDtoMapper, type ParticipantDto } from './participant-dto'

export interface PotentialManagerEventDto {
  meetingParticipant: ParticipantDto
}

@dtoMapper({ model: PotentialManagerEvent })
export class PotentialManagerEventDtoMapper {
  constructor(private meetingParticipantDtoMapper: ParticipantDtoMapper) {}

  map(obj: PotentialManagerEvent): PotentialManagerEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.map(
        obj.participant()
      ),
    }
  }
}
