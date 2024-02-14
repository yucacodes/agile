import {
  MeetingParticipantJoinedEventDtoMapper,
  type MeetingParticipantJoinedEventDto,
} from '@application'
import { ParticipantJoinedEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '@framework/presentation'
import { meetingRoomId } from '../meeting-sockets'

@singleton()
@socketEventEmitter({
  socketEvent: 'ParticipantJoined',
  domainEvent: ParticipantJoinedEvent,
})
export class ParticipantJoinedEventEmitter extends SocketEventEmitter<
  ParticipantJoinedEvent,
  MeetingParticipantJoinedEventDto
> {
  constructor(
    private meetingParticipantJoinedEventDtoMapper: MeetingParticipantJoinedEventDtoMapper
  ) {
    super()
  }

  protected emit(
    domainEvent: ParticipantJoinedEvent
  ): EmittedResult<MeetingParticipantJoinedEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.meetingParticipantJoinedEventDtoMapper.map(domainEvent),
    }
  }
}
