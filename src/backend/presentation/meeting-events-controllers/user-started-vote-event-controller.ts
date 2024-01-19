import {
  UserStartVoting,
  UserStartVotingRequestDtoValidator,
  type UserStartVotingRequestDto,
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
  socketEvent: 'UserStartVoting',
  requestValidator: UserStartVotingRequestDtoValidator,
})
export class UserStartVotingEventController extends SocketEventController<
  UserStartVotingRequestDto,
  void
> {
  constructor(private userStartVoting: UserStartVoting) {
    super()
  }

  protected override request(socket: GenericSocket): UserStartVotingRequestDto {
    return {
      meetingId: (socket.data as any).meetingId,
    }
  }

  protected async handle(
    request: UserStartVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<void> {
    await this.userStartVoting.perform(request, authData)
  }
}
