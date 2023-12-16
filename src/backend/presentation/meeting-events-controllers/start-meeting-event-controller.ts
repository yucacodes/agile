import {
  UserCreateMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  UserCreateMeeting,
  type UserCreateMeetingRequestDto,
} from '@application'
import {
  type SocketCallback,
  SocketEventController,
  type GenericSocket,
} from '../sockets'
import { registerSocketToRoom } from '../meeting-sockets'
import { singleton } from '@injection'

@singleton()
export class StartMeetingEventController extends SocketEventController<
  'StartMeeting',
  UserCreateMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(private userCreateMeeting: UserCreateMeeting) {
    super('StartMeeting')
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
