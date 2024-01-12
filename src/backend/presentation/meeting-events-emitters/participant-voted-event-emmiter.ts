import {
  MeetingParticipantVotedEventDtoMapper,
  type MeetingParticipantVotedEventDto,
} from '@application'
import { MeetingParticipantVotedEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '@framework/presentation'
import { meetingRoomId } from '../meeting-sockets'
import { TimeManager } from '@framework/domain'

@singleton()
@socketEventEmitter({
  socketEvent: 'ParticipantVoted',
  domainEvent: MeetingParticipantVotedEvent,
})
export class ParticipantVotedEventEmitter extends SocketEventEmitter<
  MeetingParticipantVotedEvent,
  MeetingParticipantVotedEventDto
> {
  constructor(
    private meetingParticipantVotedEventDtoMapper: MeetingParticipantVotedEventDtoMapper,
    private timeManager: TimeManager
  ) {
    super()
  }

  protected emit(
    domainEvent: MeetingParticipantVotedEvent
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
