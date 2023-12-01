import {
  UserCreateMeeting,
  UserCreateMeetingRequestDtoValidator,
} from '@application'

import { singleton } from 'tsyringe'
import type { MeetingSocket } from './meeting-sockets-types'
import { MeetingEventsSocketsBroadcaster } from './meeting-events-broadcaster'
import { SocketEventHandler } from '../sockets/socket-event-handler'

@singleton()
export class MeetingSocketsHandler {
  private startMeetingHandler = SocketEventHandler.facory({
    requestValidator: UserCreateMeetingRequestDtoValidator,
    useCase: this.userCreateMeeting,
  })

  constructor(
    private userCreateMeeting: UserCreateMeeting,
    private meetingEventsSocketsBroadcaster: MeetingEventsSocketsBroadcaster
  ) {
    //
  }

  handleSocketConnection(socket: MeetingSocket) {
    socket.on('StartMeeting', (request, callback) =>
      this.startMeetingHandler.handle(socket, request, (result) => {
        if (result.success) {
          this.meetingEventsSocketsBroadcaster.registerSocket(
            socket,
            result.data
          )
        }
        callback(result)
      })
    )
  }
}
