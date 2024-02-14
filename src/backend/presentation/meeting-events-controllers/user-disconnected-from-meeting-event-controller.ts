import {
  ParticipantDisconectedFromMeeting,
  MeetingParticipantDisconnectedRequestDtoValidator,
  type MeetingParticipantDisconnectedRequestDto,
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
  requestValidator: MeetingParticipantDisconnectedRequestDtoValidator,
})
export class UserDisconnectedFromMeetingEventController extends SocketEventController<
  MeetingParticipantDisconnectedRequestDto,
  void
> {
  constructor(
    private userDisconnectedFromMeeting: ParticipantDisconectedFromMeeting
  ) {
    super()
  }

  protected override request(
    socket: GenericSocket
  ): MeetingParticipantDisconnectedRequestDto {
    return {
      meetingId: (socket.data as any).meetingId,
    }
  }

  protected async handle(
    request: MeetingParticipantDisconnectedRequestDto,
    authData: AuthInformationDto | null,
  ): Promise<void> {
    await this.userDisconnectedFromMeeting.perform(request, authData)
  }
}
