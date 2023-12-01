import {
  UserCreateMeeting,
  UserCreateMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
} from '@application'

import { singleton } from 'tsyringe'
import { SocketEventHandler } from '../sockets/socket-event-handler'
import { meetingRoomId } from './meeting-rooms'
import type { MeetingSocket } from './meeting-sockets-types'

@singleton()
export class MeetingSocketsHandler {
  // Events Handlers
  private startMeetingHandler = SocketEventHandler.factory({
    requestValidator: UserCreateMeetingRequestDtoValidator,
    useCase: this.userCreateMeeting,
  })

  constructor(private userCreateMeeting: UserCreateMeeting) {}

  handleSocketConnection(socket: MeetingSocket) {
    socket.on('StartMeeting', (request, callback) =>
      this.startMeetingHandler.handle(socket, request, (result) => {
        if (result.success) {
          this.registerSocketToRoom(socket, result.data)
        }
        callback(result)
      })
    )
  }

  registerSocketToRoom(
    socket: MeetingSocket,
    data: MeetingWithAuthInformationDto
  ) {
    socket.data = { auth: data.authInfo, meetingId: data.meeting.id }
    socket.join(meetingRoomId({ meetingId: data.meeting.id }))
  }
}
