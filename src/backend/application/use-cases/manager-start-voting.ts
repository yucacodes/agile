import {
  MeetingEventsBus,
  MeetingsRepository,
  UserRole,
  VotingStartedEvent,
} from '@domain'
import { useCase } from '@framework/application'
import { TimeProvider } from '@framework/domain'
import type { AuthInformationDto } from '../dtos'
import { type ManagerStartedVotingRequestDto } from '../dtos'

@useCase({ roles: [UserRole.MeetingParticipant] })
export class ManagerStartVoting {
  constructor(
    private timeProvider: TimeProvider,
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {}

  async perform(
    request: ManagerStartedVotingRequestDto,
    authInformation: AuthInformationDto
  ): Promise<void> {
    const { meetingId } = request
    const meeting = await this.meetingsRepository.findById(meetingId)
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

    const voting = meeting.newVoting()

    this.meetingEventsBus.notify(
      VotingStartedEvent.factory({
        meeting,
        voting,
        timeProvider: this.timeProvider,
      })
    )

    this.meetingsRepository.saveUpdate(meeting)
  }
}
