import {
  MeetingParticipantStartedVoteEventDtoMapper,
  type MeetingParticipantStartedVoteEventDto,
} from '@application'
import { MeetingParticipantStartedVoteEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '@framework/presentation'
import { meetingRoomId } from '../meeting-sockets'

@singleton()
@socketEventEmitter({
  socketEvent: 'ParticipantStartedVote',
  domainEvent: MeetingParticipantStartedVoteEvent,
})
export class ParticipantStartedVoteEventEmitter extends SocketEventEmitter<
  MeetingParticipantStartedVoteEvent,
  MeetingParticipantStartedVoteEventDto
> {
  constructor(
    private meetingParticipantStartedVoteEventDtoMapper: MeetingParticipantStartedVoteEventDtoMapper
  ) {
    super()
  }

  protected emit(
    domainEvent: MeetingParticipantStartedVoteEvent
  ): EmittedResult<MeetingParticipantStartedVoteEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.meetingParticipantStartedVoteEventDtoMapper.makeDto(
        domainEvent
      ),
    }
  }
}
