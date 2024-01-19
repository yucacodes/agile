import {
  MeetingEventsBus,
  MeetingParticipantStartedVoteEvent,
  MeetingsRepository,
} from '@domain'
import { type AuthInformationDto, UseCase } from '@framework/application'
import { singleton } from '@framework/injection'
import { type UserStartVotingRequestDto } from '../dtos'

@singleton()
export class UserStartVoting extends UseCase<UserStartVotingRequestDto, void> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {
    super()
  }

  async perform(
    request: UserStartVotingRequestDto,
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

    meeting.getVotings().forEach((voting) => voting.startVoting())

    this.meetingEventsBus.notify(
      MeetingParticipantStartedVoteEvent.factory({
        meetingParticipant: meeting.participantById(authInformation.userId)!,
      })
    )
  }
}
