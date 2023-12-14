import { singleton } from 'tsyringe'
import { UseCase } from './use-case'
import type { UserDisconnectedFromMeetingDto } from '../dtos/user-disconnected-from-meeting-dto'
import type { AuthInformationDto } from '../dtos'
import { MeetingEventsBus, MeetingsRepository } from '@domain'
import { UserDisconnectedFromMeetingEvent } from '~/backend/domain/events/user-disconnected-from-meeting-event'

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
    authInformation?: AuthInformationDto | undefined
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
