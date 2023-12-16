import {
  UserJoinMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  UserJoinMeeting,
  type UserJoinMeetingRequestDto,
} from '@application'
import {
  type GenericSocket,
  type SocketCallback,
  SocketEventController,
} from '../sockets'
import { registerSocketToRoom } from '../meeting-sockets/meeting-rooms'
import { type MeetingSocket } from '../meeting-sockets'
import { singleton } from '@injection'

@singleton()
export class JoinMeetingEventController extends SocketEventController<
  'JoinMeeting',
  UserJoinMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(private userJoinMeeting: UserJoinMeeting) {
    super('JoinMeeting')
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
