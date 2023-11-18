import {
  MeetingParticipantJoinedEventDtoMapper,
  type MeetingAuthInformationDto,
} from '@application'
import {
  MeetingEventsBus,
  MeetingParticipantJoinedEvent,
  type MeetingEvent,
} from '@domain'
import { singleton } from 'tsyringe'
import type { ApiSocket } from './api-events'

@singleton()
export class MeetingEventsSocketsBroadcaster extends MeetingEventsBus {
  private sockets: ApiSocket[] = []

  constructor(
    private meetingParticipantJoinedEventDtoMapper: MeetingParticipantJoinedEventDtoMapper
  ) {
    super()
  }

  notify(event: MeetingEvent): void {
    const meetingSockets = this.sockets.filter(
      (x) =>
        x.data.auth?.meetingId === event.meetingId() &&
        x.data.auth.meetingParticipantId !==
          event.originatingMeetingParticipantId()
    )

    if (event instanceof MeetingParticipantJoinedEvent) {
      for (const socket of meetingSockets)
        socket.emit(
          'ParticipantJoined',
          this.meetingParticipantJoinedEventDtoMapper.makeDto(event)
        )
    } else {
      throw new Error(
        `${event.constructor.name} is not supported by ${MeetingEventsSocketsBroadcaster.name}`
      )
    }
  }

  registerSocket(socket: ApiSocket, authInfo: MeetingAuthInformationDto): void {
    socket.data.auth = authInfo
    this.sockets.push(socket)
  }
}
