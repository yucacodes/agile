import {
  ParticipantVotes,
  ParticipantVotesRequestDtoValidator,
  type ParticipantVotesRequestDto,
  type VotingInformationDto,
} from '@application'
import { singleton } from '@framework/injection'
import {
  SocketEventController,
  socketEventController,
} from '@framework/presentation'

@singleton()
@socketEventController({
  socketEvent: 'UserVoting',
  requestValidator: ParticipantVotesRequestDtoValidator,
})
export class UserVotingEventController extends SocketEventController<
  ParticipantVotesRequestDto,
  VotingInformationDto
> {
  constructor(private userVoting: ParticipantVotes) {
    super()
  }

  protected handle(
    request: ParticipantVotesRequestDto
  ): Promise<VotingInformationDto> {
    return this.userVoting.perform(request)
  }
}
