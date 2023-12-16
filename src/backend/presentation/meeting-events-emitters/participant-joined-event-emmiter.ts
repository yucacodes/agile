import {
  type MeetingParticipantJoinedEventDto,
  MeetingParticipantJoinedEventDtoMapper,
} from '@application'
import { MeetingParticipantJoinedEvent } from '@domain'
import { meetingRoomId } from '../meeting-sockets'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '../sockets'
import { singleton } from '@injection'

@singleton()
@socketEventEmitter({
  socketEvent: 'ParticipantJoined',
  domainEvent: MeetingParticipantJoinedEvent,
})
export class ParticipantJoinedEventEmitter extends SocketEventEmitter<
  MeetingParticipantJoinedEvent,
  MeetingParticipantJoinedEventDto
> {
  constructor(
    private meetingParticipantJoinedEventDtoMapper: MeetingParticipantJoinedEventDtoMapper
  ) {
    super()
  }

  protected emit(
    domainEvent: MeetingParticipantJoinedEvent
  ): EmittedResult<MeetingParticipantJoinedEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.meetingParticipantJoinedEventDtoMapper.makeDto(domainEvent),
    }
  }
}
