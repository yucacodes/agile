import {
  MeetingEventsBus,
  VotingStartedEvent,
  MeetingsRepository,
  Voting,
} from '@domain'
import { type AuthInformationDto, UseCase } from '@framework/application'
import { singleton } from '@framework/injection'
import { type ManagerStartedVotingRequestDto } from '../dtos'

@singleton()
export class ManagerStartVoting extends UseCase<
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

    const participant = meeting.participant(authInformation.userId)

    if (!participant) {
      throw new Error('Participant not found.')
    }

    if (!participant.isManager()) {
      throw new Error('You do not have permission to start the voting.')
    }

    const participants = [...meeting.participants().values()]
    const voting = Voting.factory({
      timeLimit: new Date(),
      participants,
    })

    meeting.addVoting(voting)

    this.meetingEventsBus.notify(
      VotingStartedEvent.factory({
        meetingParticipant: participant,
        voting,
      })
    )

    this.meetingsRepository.save(meeting)
  }
}
