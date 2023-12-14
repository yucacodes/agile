import { MeetingParticipantJoinedEventDtoMapper } from '@application'
import {
  MeetingEventsBus,
  MeetingParticipantJoinedEvent,
  type MeetingEvent,
} from '@domain'
import { meetingRoomId, type MeetingSocketsServer } from '@presentation'
import { inject, singleton } from 'tsyringe'
import { UserDisconnectedFromMeetingEvent } from '~/backend/domain/events/user-disconnected-from-meeting-event'

@singleton()
export class MeetingSocketsEventsBus extends MeetingEventsBus {
  constructor(
    @inject('MeetingSocketsServer')
    private meetingSocketsServer: MeetingSocketsServer,
    private meetingParticipantJoinedEventDtoMapper: MeetingParticipantJoinedEventDtoMapper
  ) {
    super()
  }

  notify(event: MeetingEvent): void {
    const room = this.meetingSocketsServer.to(
      meetingRoomId({
        meetingId: event.meetingId(),
      })
    )

    if (event instanceof MeetingParticipantJoinedEvent) {
      room.emit(
        'ParticipantJoined',
        this.meetingParticipantJoinedEventDtoMapper.makeDto(event)
      )
    } else if (event instanceof UserDisconnectedFromMeetingEvent) {
      room.emit('ParticipantDisconnected', {
        meetingId: event.meetingId(),
        participantId: event.participantId(),
      })
    } else {
      throw new Error(
        `${event.constructor.name} is not supported by ${MeetingSocketsEventsBus.name}`
      )
    }
  }
}
