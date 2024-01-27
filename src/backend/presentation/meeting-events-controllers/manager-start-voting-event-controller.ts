import {
  ManagerStartVoting,
  ManagerStartedVotingRequestDtoValidator,
  type ManagerStartedVotingRequestDto,
} from '@application'
import { type AuthInformationDto } from '@framework/application'
import { singleton } from '@framework/injection'
import {
  SocketEventController,
  socketEventController,
} from '@framework/presentation'

@singleton()
@socketEventController({
  socketEvent: 'ManagerStartedVoting',
  requestValidator: ManagerStartedVotingRequestDtoValidator,
})
export class ManagerStartVotingEventController extends SocketEventController<
  ManagerStartedVotingRequestDto,
  void
> {
  constructor(private managerStartVoting: ManagerStartVoting) {
    super()
  }

  protected async handle(
    request: ManagerStartedVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<void> {
    await this.managerStartVoting.perform(request, authData)
  }
}
