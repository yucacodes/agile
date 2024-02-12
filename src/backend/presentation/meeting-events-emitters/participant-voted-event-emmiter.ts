import {
  MeetingParticipantVotedEventDtoMapper,
  type MeetingParticipantVotedEventDto,
} from '@application'
import { ParticipantVotedEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '@framework/presentation'
import { meetingRoomId } from '../meeting-sockets'
import { TimeProvider } from '@framework/domain'

@singleton()
@socketEventEmitter({
  socketEvent: 'ParticipantVoted',
  domainEvent: ParticipantVotedEvent,
})
export class ParticipantVotedEventEmitter extends SocketEventEmitter<
  ParticipantVotedEvent,
  MeetingParticipantVotedEventDto
> {
  constructor(
    private meetingParticipantVotedEventDtoMapper: MeetingParticipantVotedEventDtoMapper,
    private timeManager: TimeProvider
  ) {
    super()
  }

  protected emit(
    domainEvent: ParticipantVotedEvent
  ): EmittedResult<MeetingParticipantVotedEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.meetingParticipantVotedEventDtoMapper.makeDto(
        domainEvent,
        this.timeManager
      ),
    }
  }
}
