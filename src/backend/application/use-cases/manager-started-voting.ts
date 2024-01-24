import {
  MeetingEventsBus,
  VotingStartedEvent,
  MeetingsRepository,
  Voting,
} from '@domain'
import { type AuthInformationDto, UseCase } from '@framework/application'
import { singleton } from '@framework/injection'
import { type ManagerStartedVotingRequestDto } from '../dtos'
import { TimeManager } from '@framework/domain'

@singleton()
export class ManagerStartedVoting extends UseCase<
  ManagerStartedVotingRequestDto,
  void
> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus,
    private timeManager: TimeManager
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

    const participants = meeting.participants()
    const voting = Voting.factory({
      timeLimit: new Date(),
    })

    participants.forEach((participant) => {
      voting.setParticipantVote(participant, 0, this.timeManager)
    })

    meeting.addVoting({
      timeLimit: voting.timeLimit(),
      isOpen: true,
      userVotes: new Map(),
      participants: [...participants],
    })

    this.meetingEventsBus.notify(
      VotingStartedEvent.factory({
        meetingParticipant: participant,
        voting,
      })
    )

    this.meetingsRepository.save(meeting)
  }
}
