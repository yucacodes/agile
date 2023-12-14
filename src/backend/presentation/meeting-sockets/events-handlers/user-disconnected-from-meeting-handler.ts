import { singleton } from 'tsyringe'
import {
  type GenericSocket,
  type SocketCallback,
  SocketEventHandler,
} from '../../sockets'
import type { UserDisconnectedFromMeetingDto } from '~/backend/application/dtos/user-disconnected-from-meeting-dto'
import type { MeetingWithAuthInformationDto } from '@application'
import { Logger } from '../../logger'
import { UserDisconnectedFromMeeting } from '~/backend/application/use-cases/user-disconnected-from-meeting'

@singleton()
export class UserDisconnectedFromMeetingHandler extends SocketEventHandler<
  UserDisconnectedFromMeetingDto,
  MeetingWithAuthInformationDto
> {
  constructor(
    private userDisconnectedFromMeeting: UserDisconnectedFromMeeting
  ) {
    super(new Logger(UserDisconnectedFromMeetingHandler))
  }
  protected async handle(
    socket: GenericSocket,
    request: UserDisconnectedFromMeetingDto,
    callback: SocketCallback<MeetingWithAuthInformationDto>
  ): Promise<void> {
    return this.handleWithUseCase({
      socket,
      request,
      callback,
      useCase: this.userDisconnectedFromMeeting,
    })
  }
}
