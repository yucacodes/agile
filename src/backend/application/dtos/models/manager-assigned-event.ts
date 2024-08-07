import { PotentialManagerEvent } from '@domain'
import { dtoMapper } from '@framework'
import { ParticipantDtoMapper, type ParticipantDto } from './participant-dto'

export interface ManagerRoleRequestEventDto {
  meetingParticipant: ParticipantDto
}

@dtoMapper({ model: PotentialManagerEvent })
export class ManagerRoleRequestEventDtoMapper {
  constructor(private meetingParticipantDtoMapper: ParticipantDtoMapper) {}

  map(obj: PotentialManagerEvent): ManagerRoleRequestEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.map(
        obj.participant()
      ),
    }
  }
}
