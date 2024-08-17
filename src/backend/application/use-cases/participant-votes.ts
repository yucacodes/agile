import {
  MeetingsRepository,
  ParticipantVotedEvent,
  VotingClosedEvent,
} from '@domain'
import { Authorization, EventsBus, useCase } from '@yucacodes/es'
import { TimeProvider } from '@yucacodes/es'
import {
  ParticipantVotesRequestDtoValidator,
  type AuthInformationDto,
  type ParticipantVotesRequestDto,
  type VotingDto,
  VotingDtoMapper,
} from '../dtos'

@useCase({
  allowRole: (req) => `meeting/${req.meetingId}/participant`,
  requestValidator: ParticipantVotesRequestDtoValidator,
})
export class ParticipantVotes {
  constructor(
    private authorization: Authorization<AuthInformationDto>,
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private eventsBus: EventsBus,
    private votingDtoMapper: VotingDtoMapper
  ) {}

  async perform(request: ParticipantVotesRequestDto): Promise<VotingDto> {
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

    if (voting.isClosed()) {
      throw new Error('Voting is closed.')
    }

    const participant = meeting.participant(auth.userId)

    console.log('participant', participant)

    if (!participant) {
      throw new Error('Participant not found.')
    }

    voting.setParticipantVote(participant, point)
    await this.meetingsRepository.saveUpdate(meeting)

    const event = ParticipantVotedEvent.factory({
      meeting,
      participant,
      voting: voting,
      timeProvider: this.timeProvider,
    })
    this.eventsBus.notify({ event, channel: `meeting/${meeting.id()}` })

    if (voting.isClosed()) {
      const event = VotingClosedEvent.factory({
        meeting,
        timeProvider: this.timeProvider,
        voting,
      })
      this.eventsBus.notify({
        event,
        channel: `meeting/${meeting.id()}`,
        includeOrigin: true,
      })
    }

    return this.votingDtoMapper.map(voting)
  }
}
