import { PotentialManagerEvent } from '@domain'
import { dtoMapper } from '@framework'
import { ParticipantDtoMapper, type ParticipantDto } from './participant-dto'

export interface ManagerAssignedEventDto {
  meetingParticipant: ParticipantDto
}

@dtoMapper({ model: PotentialManagerEvent })
export class ManagerAssignedEventDtoMapper {
  constructor(private meetingParticipantDtoMapper: ParticipantDtoMapper) {}

  map(obj: PotentialManagerEvent): ManagerAssignedEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.map(
        obj.participant()
      ),
    }
  }
}
