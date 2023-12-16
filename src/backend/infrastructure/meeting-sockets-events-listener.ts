import { singleton } from '@framework/injection'
import { Logger, type SocketEventController } from '@framework/presentation'
import {
  JoinMeetingEventController,
  StartMeetingEventController,
  UserDisconnectedFromMeetingEventController,
  type MeetingSocket,
} from '@presentation'

@singleton()
export class MeetingSocketsEventsListener {
  logger = new Logger(MeetingSocketsEventsListener)

  constructor(
    private startMeetingEventController: StartMeetingEventController,
    private joinMeetingEventController: JoinMeetingEventController,
    private userDisconnectedFromMeetingEventController: UserDisconnectedFromMeetingEventController
  ) {
    this.controllers().forEach((x) =>
      this.logger.info(`Controller Registered for ${x.socketEvent()} Event`)
    )
  }

  // -------- Make Sure To Add all events controllers -------------

  controllers(): SocketEventController<any, any>[] {
    return [
      this.startMeetingEventController,
      this.joinMeetingEventController,
      this.userDisconnectedFromMeetingEventController,
    ]
  }

  addToSocket(socket: MeetingSocket) {
    this.controllers().forEach((x) => socket.on(...x.listenFor(socket)))
  }
}
