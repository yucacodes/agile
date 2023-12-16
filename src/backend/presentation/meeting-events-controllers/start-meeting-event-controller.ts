import {
  UserCreateMeeting,
  UserCreateMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  type UserCreateMeetingRequestDto,
} from '@application'
import { singleton } from 'tsyringe'
import { registerSocketToRoom } from '../meeting-sockets'
import {
  SocketEventController,
  socketEventController,
  type GenericSocket,
} from '../sockets'

@singleton()
@socketEventController({
  socketEvent: 'StartMeeting',
  requestValidator: UserCreateMeetingRequestDtoValidator,
})
export class StartMeetingEventController extends SocketEventController<
  UserCreateMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(private userCreateMeeting: UserCreateMeeting) {
    super()
  }

  protected handle(
    request: UserCreateMeetingRequestDto
  ): Promise<MeetingWithAuthInformationDto> {
    return this.userCreateMeeting.perform(request)
  }

  override onSuccess(
    socket: GenericSocket,
    result: MeetingWithAuthInformationDto
  ) {
    registerSocketToRoom(socket, result)
  }
}
