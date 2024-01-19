import {
  MeetingParticipantClosedVoteEventDtoMapper,
  type MeetingParticipantClosedVoteEventDto,
} from '@application'
import { MeetingParticipantClosedVoteEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '@framework/presentation'
import { meetingRoomId } from '../meeting-sockets'

@singleton()
@socketEventEmitter({
  socketEvent: 'ParticipantClosedVote',
  domainEvent: MeetingParticipantClosedVoteEvent,
})
export class ParticipantClosedVoteEventEmitter extends SocketEventEmitter<
  MeetingParticipantClosedVoteEvent,
  MeetingParticipantClosedVoteEventDto
> {
  constructor(
    private meetingParticipantClosedVoteEventDtoMapper: MeetingParticipantClosedVoteEventDtoMapper
  ) {
    super()
  }

  protected emit(
    domainEvent: MeetingParticipantClosedVoteEvent
  ): EmittedResult<MeetingParticipantClosedVoteEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.meetingParticipantClosedVoteEventDtoMapper.makeDto(
        domainEvent
      ),
    }
  }
}
