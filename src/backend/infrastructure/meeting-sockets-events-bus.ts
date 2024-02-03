import { MeetingEventsBus, type MeetingEvent } from '@domain'
import { inject, singleton } from '@framework/injection'
import { Logger } from '@framework/presentation'
import {
  ManagerClosedVotingEventEmitter,
  ParticipantDisconnectedEventEmitter,
  ParticipantJoinedEventEmitter,
  ManagerStartedVotingEventEmitter,
  ParticipantVotedEventEmitter,
} from '@presentation'
import { Server as SocketIoServer } from 'socket.io'

@singleton()
export class MeetingSocketsEventsBus extends MeetingEventsBus {
  logger = new Logger(MeetingSocketsEventsBus)

  constructor(
    @inject('SocketIoServer')
    private socketIoServer: SocketIoServer,
    private participantJoinedEventEmitter: ParticipantJoinedEventEmitter,
    private participantDisconnectedEventEmitter: ParticipantDisconnectedEventEmitter,
    private participantVotedEventEmitter: ParticipantVotedEventEmitter,
    private managerStartedVotingEventEmitter: ManagerStartedVotingEventEmitter,
    private managerClosedVotingEventEmitter: ManagerClosedVotingEventEmitter
  ) {
    super()
    this.emitters().forEach((x) =>
      this.logger.info(`Emitter Registered for ${x.socketEvent()} Event`)
    )
  }

  // ------------- Make Sure To Add all events emitters  ------------------

  private emitters() {
    return [
      this.participantJoinedEventEmitter,
      this.participantDisconnectedEventEmitter,
      this.participantVotedEventEmitter,
      this.managerStartedVotingEventEmitter,
      this.managerClosedVotingEventEmitter,
    ]
  }

  notify(event: MeetingEvent) {
    this.emitters().forEach((x) => x.emitIfMatch(event, this.socketIoServer))
  }
}
