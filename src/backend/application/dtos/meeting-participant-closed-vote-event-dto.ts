import { type MeetingParticipantClosedVoteEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  MeetingParticipantDtoMapper,
  type MeetingParticipantDto,
} from './meeting-participant-dto'

export interface MeetingParticipantClosedVoteEventDto {
  meetingParticipant: MeetingParticipantDto
  voting: string
  time: string
}

@singleton()
export class MeetingParticipantClosedVoteEventDtoMapper {
  constructor(
    private meetingParticipantDtoMapper: MeetingParticipantDtoMapper
  ) {}

  makeDto(
    obj: MeetingParticipantClosedVoteEvent
  ): MeetingParticipantClosedVoteEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.makeDto(
        obj.meetingParticipant()
      ),
      voting: obj.voting(),
      time: obj.time.toString(),
    }
  }
}
