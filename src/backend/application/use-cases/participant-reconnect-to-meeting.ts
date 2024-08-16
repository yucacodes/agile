import { MeetingsRepository } from '@domain'
import { EventsBus, useCase } from '@yucacodes/es'
import type { MeetingDto, ParticipantReconectToMeetingRequestDto } from '../dtos'
import {
  MeetingDtoMapper,
  ParticipantReconectToMeetingRequestDtoValidator,
} from '../dtos'

@useCase({
  allowRole: (req) => `meeting/${req.meetingId}/participant`,
  requestValidator: ParticipantReconectToMeetingRequestDtoValidator,
})
export class ParticipantReconnectToMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository,
    private meetingDtoMapper: MeetingDtoMapper,
    private eventBus: EventsBus
  ) {}

  async perform(req: ParticipantReconectToMeetingRequestDto): Promise<MeetingDto> {
    const meeting = await this.meetingsRepository.findById(req.meetingId)
    if (!meeting) throw new Error('Not found')

    this.eventBus.subscribe({ channel: `meeting/${meeting.id()}` });

    return this.meetingDtoMapper.map(meeting)
  }
}
