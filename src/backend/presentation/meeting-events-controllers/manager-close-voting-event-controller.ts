import {
  ManagerCloseVoting,
  ManagerClosedVotingRequestDtoValidator,
  type ManagerClosedVotingRequestDto,
} from '@application'
import { type AuthInformationDto } from '@framework/application'
import { singleton } from '@framework/injection'
import {
  SocketEventController,
  socketEventController,
} from '@framework/presentation'

@singleton()
@socketEventController({
  socketEvent: 'ManagerClosedVoting',
  requestValidator: ManagerClosedVotingRequestDtoValidator,
})
export class ManagerCloseVotingEventController extends SocketEventController<
  ManagerClosedVotingRequestDto,
  void
> {
  constructor(private managerCloseVoting: ManagerCloseVoting) {
    super()
  }

  protected async handle(
    request: ManagerClosedVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<void> {
    await this.managerCloseVoting.perform(request, authData)
  }
}
