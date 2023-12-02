import { singleton } from 'tsyringe'
import type { MeetingSocket } from './meeting-sockets-types'
import { StartMeetingEventHandler } from './events-handlers/start-meeting-event-handler'
import { JoinMeetingEventHandler } from './events-handlers'

@singleton()
export class MeetingSocketsHandler {
  constructor(
    private startMeetingEventHandler: StartMeetingEventHandler,
    private joinMeetingEventHandler: JoinMeetingEventHandler
  ) {}

  handleSocketConnection(socket: MeetingSocket) {
    socket.on('StartMeeting', (...args) =>
      this.startMeetingEventHandler.handle(socket, ...args)
    )

    socket.on('JoinMeeting', (...args) =>
      this.joinMeetingEventHandler.handle(socket, ...args)
    )
  }
}
