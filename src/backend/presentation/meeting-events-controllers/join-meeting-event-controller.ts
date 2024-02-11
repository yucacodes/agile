import {
  UserJoinMeeting,
  UserJoinMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  type UserJoinMeetingRequestDto,
} from '@application'
import { singleton } from '@framework/injection'
import {
  SocketEventController,
  socketEventController,
} from '@framework/presentation'
import { type MeetingSocket } from '../meeting-sockets'
import { registerSocketToRoom } from '../meeting-sockets/meeting-rooms'

@singleton()
@socketEventController({
  socketEvent: 'JoinMeeting',
  requestValidator: UserJoinMeetingRequestDtoValidator,
})
export class JoinMeetingEventController extends SocketEventController<
  UserJoinMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(private userJoinMeeting: UserJoinMeeting) {
    super()
  }

  protected handle(
    request: UserJoinMeetingRequestDto,
  ): Promise<MeetingWithAuthInformationDto> {
    return this.userJoinMeeting.perform(request)
  }

  override onSuccess(
    socket: MeetingSocket,
    result: MeetingWithAuthInformationDto
  ): void {
    registerSocketToRoom(socket, result)
  }
}
