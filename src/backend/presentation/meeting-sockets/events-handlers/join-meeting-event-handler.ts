import {
  UserJoinMeetingRequestDtoValidator,
  type MeetingWithAuthInformationDto,
  UserJoinMeeting,
  type UserJoinMeetingRequestDto,
} from '@application'
import { SocketEventHandler } from '../../sockets'
import { registerSocketToRoom } from '../meeting-rooms'
import { type MeetingSocket } from '../meeting-sockets-types'
import { singleton } from 'tsyringe'

@singleton()
export class JoinMeetingEventHandler extends SocketEventHandler<
  UserJoinMeetingRequestDto,
  MeetingWithAuthInformationDto
> {
  constructor(userJoinMeeting: UserJoinMeeting) {
    super(UserJoinMeetingRequestDtoValidator, userJoinMeeting)
  }

  override onSuccess(
    socket: MeetingSocket,
    result: MeetingWithAuthInformationDto
  ): void {
    registerSocketToRoom(socket, result)
  }
}
