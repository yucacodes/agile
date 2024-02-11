import {
  MeetingEventsBus,
  MeetingsRepository,
  MeetingParticipantDisconnectedEvent,
} from '@domain'
import { UseCase, type AuthInformationDto } from '@framework/application'
import { singleton } from '@framework/injection'
import { type MeetingParticipantDisconnectedRequestDto } from '../dtos'

@singleton()
export class UserDisconnectedFromMeeting extends UseCase<
  MeetingParticipantDisconnectedRequestDto,
  void
> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {
    super()
  }
  async perform(
    request: MeetingParticipantDisconnectedRequestDto,
    authInformation: AuthInformationDto | null,
  ): Promise<void> {
    if (!authInformation) throw new Error('Invalid auth information')

    const meeting = await this.meetingsRepository.fetchById(request.meetingId)

    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    meeting.notifyParticipantDisconnected(authInformation.userId)

    await this.meetingsRepository.save(meeting)

    this.meetingEventsBus.notify(
      MeetingParticipantDisconnectedEvent.factory({
        meetingParticipant: meeting.participantById(authInformation.userId)!,
      })
    )
  }
}
