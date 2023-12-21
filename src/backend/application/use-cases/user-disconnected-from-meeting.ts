import {
  MeetingEventsBus,
  MeetingsRepository,
  UserDisconnectedFromMeetingEvent,
} from '@domain'
import { UseCase, type AuthInformationDto } from '@framework/application'
import { singleton } from '@framework/injection'
import { type UserDisconnectedFromMeetingDto } from '../dtos'

@singleton()
export class UserDisconnectedFromMeeting extends UseCase<
  UserDisconnectedFromMeetingDto,
  void
> {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingEventsBus: MeetingEventsBus
  ) {
    super()
  }
  async perform(
    request: UserDisconnectedFromMeetingDto,
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
      UserDisconnectedFromMeetingEvent.factory({
        meetingParticipant: meeting.participantById(authInformation.userId)!,
      })
    )
  }
}
