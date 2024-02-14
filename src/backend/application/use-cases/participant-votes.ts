import { MeetingsRepository, ParticipantVotedEvent } from '@domain'
import { Authorization, EventsBus, useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import type { AuthInformationDto, UserVotingRequestDto } from '../dtos'

@useCase({ allowRole: (req) => `meeting/${req.meetingId}/participant` })
export class ParticipantVotes {
  constructor(
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private eventsBus: EventsBus
  ) {}

  async perform(request: UserVotingRequestDto): Promise<void> {
    const auth = this.authorization.get()
    const { meetingId, votingId, point } = request
    const meeting = await this.meetingsRepository.findById(meetingId)
    if (!meeting) {
      throw new Error('Meeting not found.')
    }

    const voting = meeting.voting(votingId)
    if (!voting) {
      throw new Error('Voting not found.')
    }

    if (!voting.isOpen()) {
      throw new Error('Voting is closed.')
    }

    const participant = meeting.participant(auth.userId)

    if (!participant) {
      throw new Error('Participant not found.')
    }

    voting.setParticipantVote(participant, point)

    const event = ParticipantVotedEvent.factory({
      meeting,
      participant,
      voting: voting,
      timeProvider: this.timeProvider,
    })

    this.eventsBus.notify({ event, channel: `meeting/${meeting.id()}` })
  }
}
