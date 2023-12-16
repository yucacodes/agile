import { singleton } from 'tsyringe'
import type { MeetingSocket } from './meeting-sockets-types'
import { StartMeetingEventHandler } from './events-handlers/start-meeting-event-handler'
import { JoinMeetingEventHandler } from './events-handlers'
import { UserDisconnectedFromMeetingHandler } from './events-handlers/user-disconnected-from-meeting-handler'

@singleton()
export class MeetingSocketsHandler {
  constructor(
    private startMeetingEventHandler: StartMeetingEventHandler,
    private joinMeetingEventHandler: JoinMeetingEventHandler,
    private userDisconnectedFromMeetingHandler: UserDisconnectedFromMeetingHandler
  ) {}

  handleSocketConnection(socket: MeetingSocket) {
    socket.on('StartMeeting', this.startMeetingEventHandler.for(socket))
    socket.on('JoinMeeting', this.joinMeetingEventHandler.for(socket))
    socket.on(
      'UserDisconnectedFromMeeting',
      this.userDisconnectedFromMeetingHandler.for(socket)
    )
  }
}