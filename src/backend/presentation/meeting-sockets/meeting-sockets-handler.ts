import { singleton } from 'tsyringe'
import type { MeetingSocket } from './meeting-sockets-types'
import { StartMeetingEventHandler } from './events-handlers/start-meeting-event-handler'

@singleton()
export class MeetingSocketsHandler {
  constructor(private startMeetingEventHandler: StartMeetingEventHandler) {}

  handleSocketConnection(socket: MeetingSocket) {
    socket.on('StartMeeting', (...args) =>
      this.startMeetingEventHandler.handle(socket, ...args)
    )
  }
}
