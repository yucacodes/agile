import {
  UserDisconnectedFromMeeting,
  UserDisconnectedFromMeetingDtoValidator,
  type UserDisconnectedFromMeetingDto,
} from '@application'
import { type AuthInformationDto } from '@framework/application'
import { singleton } from '@framework/injection'
import {
  SocketEventController,
  socketEventController,
  type GenericSocket,
} from '@framework/presentation'

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
    request: UserDisconnectedFromMeetingDto,
    authData: AuthInformationDto | null,
  ): Promise<void> {
    await this.userDisconnectedFromMeeting.perform(request, authData)
  }
}
