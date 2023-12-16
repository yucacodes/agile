import { MeetingEventsBus, type MeetingEvent } from '@domain'
import { singleton } from '@injection'
import { ParticipantJoinedEventEmitter } from '@presentation'
import { Server as SocketIoServer } from 'socket.io'

@singleton()
export class MeetingSocketsEventsBus extends MeetingEventsBus {
  constructor(
    private socketIoServer: SocketIoServer,
    private participantJoinedEventEmitter: ParticipantJoinedEventEmitter
  ) {
    super()
  }

  // Make Sure To Add all events emitters
  notify(event: MeetingEvent) {
    this.participantJoinedEventEmitter.emitIfMatch(event, this.socketIoServer)
  }
}
