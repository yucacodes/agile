import { singleton } from '@injection'
import {
  JoinMeetingEventController,
  Logger,
  StartMeetingEventController,
  type MeetingSocket,
  type SocketEventController,
} from '@presentation'

@singleton()
export class MeetingSocketsEventsListener {
  logger = new Logger(MeetingSocketsEventsListener)

  constructor(
    private startMeetingEventController: StartMeetingEventController,
    private joinMeetingEventController: JoinMeetingEventController
  ) {
    this.controllers().forEach((x) =>
      this.logger.info(`Controller Registered for ${x.socketEvent()} Event`)
    )
  }

  // -------- Make Sure To Add all events controllers -------------

  controllers(): SocketEventController<any, any>[] {
    return [this.startMeetingEventController, this.joinMeetingEventController]
  }

  addToSocket(socket: MeetingSocket) {
    this.controllers().forEach((x) => socket.on(...x.listenFor(socket)))
  }
}
