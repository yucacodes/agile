import { singleton } from '@injection'
import {
  JoinMeetingEventController,
  StartMeetingEventController,
  type MeetingSocket,
} from '@presentation'

@singleton()
export class MeetingSocketsEventsListener {
  constructor(
    private startMeetingEventController: StartMeetingEventController,
    private joinMeetingEventController: JoinMeetingEventController
  ) {}

  // Make Sure To Add all events controllers
  addToSocket(socket: MeetingSocket) {
    socket.on(...this.startMeetingEventController.listenFor(socket))
    socket.on(...this.joinMeetingEventController.listenFor(socket))
  }
}
