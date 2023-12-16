import {
  UserJoinMeeting,
  UserJoinMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  type UserJoinMeetingRequestDto,
} from '@application'
import { singleton } from '@injection'
import { type MeetingSocket } from '../meeting-sockets'
import { registerSocketToRoom } from '../meeting-sockets/meeting-rooms'
import { SocketEventController, socketEventController } from '../sockets'

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
    request: UserJoinMeetingRequestDto
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
