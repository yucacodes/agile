import {
  MeetingEventsBus,
  MeetingParticipantClosedVoteEvent,
  MeetingsRepository,
} from '@domain'
import { type AuthInformationDto, UseCase } from '@framework/application'
import { singleton } from '@framework/injection'
import { type UserCloseVotingRequestDto } from '../dtos'

@singleton()
export class UserCloseVoting extends UseCase<UserCloseVotingRequestDto, void> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {
    super()
  }

  async perform(
    request: UserCloseVotingRequestDto,
    authInformation: AuthInformationDto | null
  ): Promise<void> {
    if (!authInformation) throw new Error('Invalid auth information')

    const { meetingId, votingId } = request

    const meeting = await this.meetingsRepository.fetchById(meetingId)

    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    const participant = meeting.participantById(authInformation.userId)

    if (!participant) {
      throw new Error('Participant not found.')
    }

    if (!participant.isManager()) {
      throw new Error('You do not have permission to start the voting.')
    }

    const voting = meeting.votingById(votingId)

    if (!voting) {
      throw new Error('Voting not found.')
    }

    voting.manualCloseVoting()

    this.meetingEventsBus.notify(
      MeetingParticipantClosedVoteEvent.factory({
        meetingParticipant: meeting.participantById(authInformation.userId)!,
        voting,
      })
    )
  }
}
