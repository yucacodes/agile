import { type MeetingParticipantDisconnectedEvent } from '@domain'
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
    obj: MeetingParticipantDisconnectedEvent
  ): MeetingParticipantDisconnectedEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.makeDto(
        obj.meetingParticipant()
      ),
      time: obj.time.toString(),
    }
  }
}
