import {
  MeetingParticipantDisconnectedEventDtoMapper,
  type MeetingParticipantDisconnectedEventDto
} from '@application'
import { MeetingParticipantDisconnectedEvent } from '@domain'
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
  domainEvent: MeetingParticipantDisconnectedEvent,
})
export class ParticipantDisconnectedEventEmitter extends SocketEventEmitter<
  MeetingParticipantDisconnectedEvent,
  MeetingParticipantDisconnectedEventDto
> {
  constructor(
    private meetingParticipantDisconnectedEventDtoMapper: MeetingParticipantDisconnectedEventDtoMapper
  ) {
    super()
  }

  protected emit(
    domainEvent: MeetingParticipantDisconnectedEvent
  ): EmittedResult<MeetingParticipantDisconnectedEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.meetingParticipantDisconnectedEventDtoMapper.makeDto(
        domainEvent
      ),
    }
  }
}
