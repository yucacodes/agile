import {
  MeetingEventsBus,
  VotingStartedEvent,
  MeetingsRepository,
  Meeting,
} from '@domain'
import { type AuthInformationDto, UseCase } from '@framework/application'
import { singleton } from '@framework/injection'
import { type ManagerStartedVotingRequestDto } from '../dtos'

@singleton()
export class ManagerStartedVoting extends UseCase<
  ManagerStartedVotingRequestDto,
  void
> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {
    super()
  }

  async perform(
    request: ManagerStartedVotingRequestDto,
    authInformation: AuthInformationDto | null
  ): Promise<void> {
    if (!authInformation) throw new Error('Invalid auth information')

    const { meetingId } = request

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

    // meeting.getVotings().forEach((voting) => voting.startVoting())

    this.meetingEventsBus.notify(
      VotingStartedEvent.factory({
        meetingParticipant: participant,
      })
    )

    const { meeting: votes } = Meeting.factory()
    this.meetingsRepository.save(votes)
  }
}
