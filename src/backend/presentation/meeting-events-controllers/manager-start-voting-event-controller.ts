import {
  ManagerStartVoting,
  ManagerStarteVotingRequestDtoValidator,
  type ManagerStarteVotingRequestDto,
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
  requestValidator: ManagerStarteVotingRequestDtoValidator,
})
export class ManagerStartVotingEventController extends SocketEventController<
  ManagerStarteVotingRequestDto,
  void
> {
  constructor(private managerStartVoting: ManagerStartVoting) {
    super()
  }

  protected async handle(
    request: ManagerStarteVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<void> {
    await this.managerStartVoting.perform(request, authData)
  }
}
