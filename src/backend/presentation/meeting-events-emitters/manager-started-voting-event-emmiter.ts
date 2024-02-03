import {
  ManagerStartedVotingEventDtoMapper,
  type ManagerStartedVotingEventDto,
} from '@application'
import { VotingStartedEvent } from '@domain'
import { singleton } from '@framework/injection'
import {
  SocketEventEmitter,
  socketEventEmitter,
  type EmittedResult,
} from '@framework/presentation'
import { meetingRoomId } from '../meeting-sockets'

@singleton()
@socketEventEmitter({
  socketEvent: 'ManagerStartedVoting',
  domainEvent: VotingStartedEvent,
})
export class ManagerStartedVotingEventEmitter extends SocketEventEmitter<
  VotingStartedEvent,
  ManagerStartedVotingEventDto
> {
  constructor(
    private managerStartedVotingEventDtoMapper: ManagerStartedVotingEventDtoMapper
  ) {
    super()
  }

  protected emit(
    domainEvent: VotingStartedEvent
  ): EmittedResult<ManagerStartedVotingEventDto> {
    return {
      roomId: meetingRoomId({ meetingId: domainEvent.meetingId() }),
      data: this.managerStartedVotingEventDtoMapper.makeDto(domainEvent),
    }
  }
}
