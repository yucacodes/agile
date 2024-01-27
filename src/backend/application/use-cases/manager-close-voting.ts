import {
  MeetingEventsBus,
  VotingClosedEvent,
  MeetingsRepository,
} from '@domain'
import { type AuthInformationDto, UseCase } from '@framework/application'
import { singleton } from '@framework/injection'
import { type ManagerClosedVotingRequestDto } from '../dtos'

@singleton()
export class ManagerCloseVoting extends UseCase<
  ManagerClosedVotingRequestDto,
  void
> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {
    super()
  }

  async perform(
    request: ManagerClosedVotingRequestDto,
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
      VotingClosedEvent.factory({
        meetingParticipant: participant,
        voting,
      })
    )

    this.meetingsRepository.save(meeting)
  }
}
