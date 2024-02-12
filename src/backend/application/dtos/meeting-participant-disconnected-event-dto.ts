import { type ParticipantDisconnectedEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  MeetingParticipantDtoMapper,
  type MeetingParticipantDto,
} from './meeting-participant-dto'

export interface MeetingParticipantDisconnectedEventDto {
  meetingParticipant: MeetingParticipantDto
  time: string
}

@singleton()
export class MeetingParticipantDisconnectedEventDtoMapper {
  constructor(
    private meetingParticipantDtoMapper: MeetingParticipantDtoMapper
  ) {}

  makeDto(
    obj: ParticipantDisconnectedEvent
  ): MeetingParticipantDisconnectedEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.makeDto(
        obj.participant()
      ),
      time: obj.time.toString(),
    }
  }
}
