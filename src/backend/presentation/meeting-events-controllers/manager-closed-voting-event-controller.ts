import {
  ManagerClosedVoting,
  ManagerClosedVotingRequestDtoValidator,
  type ManagerClosedVotingRequestDto,
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
  socketEvent: 'ManagerClosedVoting',
  requestValidator: ManagerClosedVotingRequestDtoValidator,
})
export class ManagerClosedVotingEventController extends SocketEventController<
  ManagerClosedVotingRequestDto,
  void
> {
  constructor(private managerClosedVoting: ManagerClosedVoting) {
    super()
  }

  protected override request(
    socket: GenericSocket
  ): ManagerClosedVotingRequestDto {
    return {
      meetingId: (socket.data as any).meetingId,
      votingId: (socket.data as any).votingId,
    }
  }

  protected async handle(
    request: ManagerClosedVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<void> {
    await this.managerClosedVoting.perform(request, authData)
  }
}
