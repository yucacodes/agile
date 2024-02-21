import { ParticipantDisconnectedEvent } from '@domain'
import { dtoMapper } from '@framework'
import {
  MeetingParticipantDtoMapper,
  type MeetingParticipantDto,
} from './meeting-participant-dto'

export interface MeetingParticipantDisconnectedEventDto {
  meetingParticipant: MeetingParticipantDto
  time: string
}

@dtoMapper({ model: ParticipantDisconnectedEvent })
export class MeetingParticipantDisconnectedEventDtoMapper {
  constructor(
    private meetingParticipantDtoMapper: MeetingParticipantDtoMapper
  ) {}

  map(
    obj: ParticipantDisconnectedEvent
  ): MeetingParticipantDisconnectedEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.map(
        obj.participant()
      ),
      time: obj.time.toString(),
    }
  }
}
