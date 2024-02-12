import {
  MeetingParticipantDisconnectedEventDtoMapper,
  type MeetingParticipantDisconnectedEventDto
} from '@application'
import { ParticipantDisconnectedEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '@framework/presentation'
import { meetingRoomId } from '../meeting-sockets'

@singleton()
@socketEventEmitter({
  socketEvent: 'ParticipantDisconnected',
  domainEvent: ParticipantDisconnectedEvent,
})
export class ParticipantDisconnectedEventEmitter extends SocketEventEmitter<
  ParticipantDisconnectedEvent,
  MeetingParticipantDisconnectedEventDto
> {
  constructor(
    private meetingParticipantDisconnectedEventDtoMapper: MeetingParticipantDisconnectedEventDtoMapper
  ) {
    super()
  }

  protected emit(
    domainEvent: ParticipantDisconnectedEvent
  ): EmittedResult<MeetingParticipantDisconnectedEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.meetingParticipantDisconnectedEventDtoMapper.makeDto(
        domainEvent
      ),
    }
  }
}
