import {
  UserCreateMeeting,
  UserCreateMeetingRequestDtoValidator,
  type UserCreateMeetingRequestDto,
} from '@application'
import type { ApiSocket, OnStartMeetingCallback } from './api-events'
import { MeetingEventsSocketsBroadcaster } from './meeting-events-sockets-broadcaster'
import { singleton } from 'tsyringe'
import { validate } from 'class-validator'

@singleton()
export class MeetingSocketsHandler {
  constructor(
    private userCreateMeeting: UserCreateMeeting,
    private meetingEventsSocketsBroadcaster: MeetingEventsSocketsBroadcaster
  ) {}

  handleSocketConnection(socket: ApiSocket) {
    socket.on('StartMeeting', (request, callback) =>
      this.handleStartMeeting(socket, request, callback)
    )
  }

  // private methods

  private async handleStartMeeting(
    socket: ApiSocket,
    request: UserCreateMeetingRequestDto,
    callback: OnStartMeetingCallback
  ) {
    
    const result = await this.userCreateMeeting.perform(request)
    this.meetingEventsSocketsBroadcaster.registerSocket(socket, result.authInfo)
    callback(result)
  }
}
