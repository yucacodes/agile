import {
  ManagerCloseVoting,
  ManagerCloseVotingRequestDtoValidator,
  type ManagerCloseVotingRequestDto,
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
  requestValidator: ManagerCloseVotingRequestDtoValidator,
})
export class ManagerCloseVotingEventController extends SocketEventController<
  ManagerCloseVotingRequestDto,
  void
> {
  constructor(private managerCloseVoting: ManagerCloseVoting) {
    super()
  }

  protected async handle(
    request: ManagerCloseVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<void> {
    await this.managerCloseVoting.perform(request, authData)
  }
}
