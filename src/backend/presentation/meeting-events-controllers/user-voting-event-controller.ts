import {
  UserVoting,
  UserVotingRequestDtoValidator,
  type UserVotingRequestDto,
  type VotingInformationDto,
} from '@application'
import { singleton } from '@framework/injection'
import {
  SocketEventController,
  socketEventController,
} from '@framework/presentation'
import { type MeetingSocket } from '../meeting-sockets'

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
    request: UserVotingRequestDto
  ): Promise<VotingInformationDto> {
    return this.userVoting.perform(request)
  }

  override onSuccess(socket: MeetingSocket, result: VotingInformationDto): any {
    return { socket, result }
  }
}
