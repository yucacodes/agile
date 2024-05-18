import { MeetingsRepository } from '@domain'
import { useCase } from '@framework'
import type { MeetingDto, ParticipantGetMeetingRequestDto } from '../dtos'
import {
  MeetingDtoMapper,
  ParticipantGetMeetingRequestDtoValidator,
} from '../dtos'

@useCase({
  allowRole: (req) => `meeting/${req.meetingId}/participant`,
  requestValidator: ParticipantGetMeetingRequestDtoValidator,
})
export class ParticipantGetMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingDtoMapper: MeetingDtoMapper
  ) {}

  async perform(req: ParticipantGetMeetingRequestDto): Promise<MeetingDto> {
    const meeting = await this.meetingsRepository.findById(req.meetingId)
    if (!meeting) throw new Error('Not found')
    return this.meetingDtoMapper.map(meeting)
  }
}
