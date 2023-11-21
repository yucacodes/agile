import {
  UserCreateMeeting,
  UserCreateMeetingRequestDtoValidator,
  type UserCreateMeetingRequestDto,
} from '@application'
import { type ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { singleton } from 'tsyringe'
import type { ApiSocket, MeetingUseCaseCallback } from './api-events'
import { MeetingEventsSocketsBroadcaster } from './meeting-events-sockets-broadcaster'

@singleton()
export class MeetingSocketsHandler {
  constructor(
    private userCreateMeeting: UserCreateMeeting,
    private meetingEventsSocketsBroadcaster: MeetingEventsSocketsBroadcaster
  ) {}

  handleSocketConnection(socket: ApiSocket) {
    socket.on('StartMeeting', (request, callback) =>
      this.handleUseCaseResult(
        this.handleStartMeeting(socket, request),
        callback
      )
    )
  }

  // events handlers

  private async handleStartMeeting(
    socket: ApiSocket,
    request: UserCreateMeetingRequestDto
  ) {
    await this.validateRequest(request, UserCreateMeetingRequestDtoValidator)
    const result = await this.userCreateMeeting.perform(request)
    this.meetingEventsSocketsBroadcaster.registerSocket(socket, result.authInfo)

    // TODO: Add meeting events handlers
    //

    return result
  }

  // Validation controls

  private async validateRequest<V extends object, P>(
    request: P,
    validator: ClassConstructor<V>
  ): Promise<void> {
    const errors = await validate(plainToInstance(validator, request))
    if (errors.length > 0) throw new Error('Invalid request')
  }

  private async handleUseCaseResult<R>(
    promise: Promise<R>,
    callback: MeetingUseCaseCallback<R>
  ): Promise<void> {
    try {
      const result = await promise
      callback({ success: true, result })
    } catch {
      callback({ success: false })
    }
  }
}
