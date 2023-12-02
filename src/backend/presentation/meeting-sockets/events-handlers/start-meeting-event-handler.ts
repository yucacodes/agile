import {
  UserCreateMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  UserCreateMeeting,
  type UserCreateMeetingRequestDto,
} from '@application'
import { SocketEventHandler, type GenericSocket } from '../../sockets'
import { registerSocketToRoom } from '../meeting-rooms'
import { singleton } from 'tsyringe'

@singleton()
export class StartMeetingEventHandler extends SocketEventHandler<
  UserCreateMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(userCreateMeeting: UserCreateMeeting) {
    super(UserCreateMeetingRequestDtoValidator, userCreateMeeting)
  }

  override onSuccess(socket: GenericSocket, result: MeetingWithAuthInformationDto) {
    registerSocketToRoom(socket, result)
  }
}
