import {
  UserDisconnectedFromMeeting,
  UserDisconnectedFromMeetingDtoValidator,
  type UserDisconnectedFromMeetingDto,
} from '@application'
import { singleton } from '@injection'
import { SocketEventController, socketEventController } from '../sockets'

@singleton()
@socketEventController({
  socketEvent: 'disconnect',
  requestValidator: UserDisconnectedFromMeetingDtoValidator,
})
export class UserDisconnectedFromMeetingEventController extends SocketEventController<
  UserDisconnectedFromMeetingDto,
  void
> {
  constructor(
    private userDisconnectedFromMeeting: UserDisconnectedFromMeeting
  ) {
    super()
  }

  protected async handle(
    request: UserDisconnectedFromMeetingDto
  ): Promise<void> {
    await this.userDisconnectedFromMeeting.perform(request)
  }
}
