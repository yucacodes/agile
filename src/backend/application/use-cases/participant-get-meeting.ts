import { MeetingsRepository } from '@domain'
import type { MeetingDto, ParticipantGetMeetingRequestDto } from '../dtos'
import {
  MeetingDtoMapper,
  ParticipantGetMeetingRequestDtoValidator,
} from '../dtos'
import { useCase } from '@yucacodes/es'

@useCase({
  allowRole: (req) => `meeting/${req.id}/participant`,
  requestValidator: ParticipantGetMeetingRequestDtoValidator,
})
export class ParticipantGetMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingDtoMapper: MeetingDtoMapper
  ) {}

  async perform(req: ParticipantGetMeetingRequestDto): Promise<MeetingDto> {
    const meeting = await this.meetingsRepository.findById(req.id)
    if (!meeting) throw new Error('Not found')
    return this.meetingDtoMapper.map(meeting)
  }
}
