import {
  ManagerClosedVotingEventDtoMapper,
  type ManagerClosedVotingEventDto,
} from '@application'
import { VotingClosedEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '@framework/presentation'
import { meetingRoomId } from '../meeting-sockets'

@singleton()
@socketEventEmitter({
  socketEvent: 'ManagerClosedVoting',
  domainEvent: VotingClosedEvent,
})
export class ManagerClosedVotingEventEmitter extends SocketEventEmitter<
  VotingClosedEvent,
  ManagerClosedVotingEventDto
> {
  constructor(
    private managerClosedVotingEventDtoMapper: ManagerClosedVotingEventDtoMapper
  ) {
    super()
  }

  protected emit(
    domainEvent: VotingClosedEvent
  ): EmittedResult<ManagerClosedVotingEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.managerClosedVotingEventDtoMapper.makeDto(domainEvent),
    }
  }
}
