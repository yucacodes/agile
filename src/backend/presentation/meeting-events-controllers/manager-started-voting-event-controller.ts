import {
  ManagerStartedVoting,
  ManagerStartedVotingRequestDtoValidator,
  type ManagerStartedVotingRequestDto,
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
  socketEvent: 'ManagerStartedVoting',
  requestValidator: ManagerStartedVotingRequestDtoValidator,
})
export class ManagerStartedVotingEventController extends SocketEventController<
  ManagerStartedVotingRequestDto,
  void
> {
  constructor(private managerStartedVoting: ManagerStartedVoting) {
    super()
  }

  protected override request(
    socket: GenericSocket
  ): ManagerStartedVotingRequestDto {
    return {
      meetingId: (socket.data as any).meetingId,
    }
  }

  protected async handle(
    request: ManagerStartedVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<void> {
    await this.managerStartedVoting.perform(request, authData)
  }
}
