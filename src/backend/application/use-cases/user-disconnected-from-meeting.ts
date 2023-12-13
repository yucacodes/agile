import { singleton } from 'tsyringe'
import { UseCase } from './use-case'
import type { UserDisconnectedFromMeetingDto } from '../dtos/user-disconnected-from-meeting-dto'
import type { AuthInformationDto } from '../dtos'
import { MeetingsRepository } from '@domain'

@singleton()
export class UserDisconnectedFromMeeting extends UseCase<
  UserDisconnectedFromMeetingDto,
  void
> {
  constructor(private meetingsRepository: MeetingsRepository) {
    super()
  }
  async perform(
    request: UserDisconnectedFromMeetingDto,
    authInformation?: AuthInformationDto | undefined
  ): Promise<void> {
    const meeting = await this.meetingsRepository.fetchById(request.meetingId)

    if (!meeting) {
      throw new Error('Invalid meeting')
    }

    meeting.notifyParticipantDisconnected(authInformation!.userId)

    meeting.setAsSaved()
  }
}

