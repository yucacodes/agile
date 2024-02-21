import {
  UserVoting,
  UserVotingRequestDtoValidator,
  type UserVotingRequestDto,
  type VotingInformationDto,
} from '@application'
import { AuthInformationDto } from '@framework/application'
import { singleton } from '@framework/injection'
import {
  SocketEventController,
  socketEventController,
} from '@framework/presentation'

@singleton()
@socketEventController({
  socketEvent: 'UserVoting',
  requestValidator: UserVotingRequestDtoValidator,
})
export class UserVotingEventController extends SocketEventController<
  UserVotingRequestDto,
  VotingInformationDto
> {
  constructor(private userVoting: UserVoting) {
    super()
  }

  protected handle(
    request: UserVotingRequestDto,
    authData: AuthInformationDto | null
  ): Promise<VotingInformationDto> {
    return this.userVoting.perform(request, authData)
  }
}
