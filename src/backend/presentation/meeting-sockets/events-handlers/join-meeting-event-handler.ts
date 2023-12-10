import {
  UserJoinMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  UserJoinMeeting,
  type UserJoinMeetingRequestDto,
} from '@application'
import {
  GenericSocket,
  SocketCallback,
  SocketEventHandler,
} from '../../sockets'
import { registerSocketToRoom } from '../meeting-rooms'
import { type MeetingSocket } from '../meeting-sockets-types'
import { singleton } from 'tsyringe'
import { Logger } from '../../logger'

@singleton()
export class JoinMeetingEventHandler extends SocketEventHandler<
  UserJoinMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(private userJoinMeeting: UserJoinMeeting) {
    super(new Logger(JoinMeetingEventHandler))
  }

  protected handle(
    socket: GenericSocket,
    request: UserJoinMeetingRequestDto,
    callback: SocketCallback<MeetingWithAuthInformationDto>
  ): Promise<void> {
    return this.handleWithUseCase({
      socket,
      request,
      callback,
      requestValidator: UserJoinMeetingRequestDtoValidator,
      useCase: this.userJoinMeeting,
    })
  }

  override onSuccess(
    socket: MeetingSocket,
    result: MeetingWithAuthInformationDto
  ): void {
    registerSocketToRoom(socket, result)
  }
}
