import {
  UserDisconnectedFromMeeting,
  UserDisconnectedFromMeetingDtoValidator,
  type UserDisconnectedFromMeetingDto,
} from '@application'
import { singleton } from '@injection'
import {
  SocketEventController,
  socketEventController,
  type GenericSocket,
} from '../sockets'

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

  protected override request(
    socket: GenericSocket
  ): UserDisconnectedFromMeetingDto {
    return {
      meetingId: (socket.data as any).meetingId,
    }
  }

  protected async handle(
    request: UserDisconnectedFromMeetingDto
  ): Promise<void> {
    await this.userDisconnectedFromMeeting.perform(request)
  }
}
