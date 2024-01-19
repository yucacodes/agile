import {
  UserCloseVoting,
  UserCloseVotingRequestDtoValidator,
  type UserCloseVotingRequestDto,
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
  socketEvent: 'UserCloseVoting',
  requestValidator: UserCloseVotingRequestDtoValidator,
})
export class UserCloseVotingEventController extends SocketEventController<
  UserCloseVotingRequestDto,
  void
> {
  constructor(private userCloseVoting: UserCloseVoting) {
    super()
  }

  protected override request(socket: GenericSocket): UserCloseVotingRequestDto {
    return {
      meetingId: (socket.data as any).meetingId,
      votingId: (socket.data as any).votingId,
    }
  }

  protected async handle(
    request: UserCloseVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<void> {
    await this.userCloseVoting.perform(request, authData)
  }
}
