import { type MeetingParticipantStartedVoteEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  MeetingParticipantDtoMapper,
  type MeetingParticipantDto,
} from './meeting-participant-dto'

export interface MeetingParticipantStartedVoteEventDto {
  meetingParticipant: MeetingParticipantDto
  time: string
}

@singleton()
export class MeetingParticipantStartedVoteEventDtoMapper {
  constructor(
    private meetingParticipantDtoMapper: MeetingParticipantDtoMapper
  ) {}

  makeDto(
    obj: MeetingParticipantStartedVoteEvent
  ): MeetingParticipantStartedVoteEventDto {
    return {
      meetingParticipant: this.meetingParticipantDtoMapper.makeDto(
        obj.meetingParticipant()
      ),
      time: obj.time.toString(),
    }
  }
}
