import {
  UserCreateMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  UserCreateMeeting,
  type UserCreateMeetingRequestDto,
} from '@application'
import {
  SocketCallback,
  SocketEventHandler,
  type GenericSocket,
} from '../../sockets'
import { registerSocketToRoom } from '../meeting-rooms'
import { singleton } from 'tsyringe'
import { Logger } from '../../logger'

@singleton()
export class StartMeetingEventHandler extends SocketEventHandler<
  UserCreateMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(private userCreateMeeting: UserCreateMeeting) {
    super(new Logger(StartMeetingEventHandler))
  }

  protected handle(
    socket: GenericSocket,
    request: UserCreateMeetingRequestDto,
    callback: SocketCallback<MeetingWithAuthInformationDto>
  ): Promise<void> {
    return this.handleWithUseCase({
      socket,
      request,
      callback,
      requestValidator: UserCreateMeetingRequestDtoValidator,
      useCase: this.userCreateMeeting,
    })
  }

  override onSuccess(
    socket: GenericSocket,
    result: MeetingWithAuthInformationDto
  ) {
    registerSocketToRoom(socket, result)
  }
}
