import {
  type MeetingParticipantJoinedEventDtoMapper,
  type MeetingWithAuthInformationDto,
} from '@application'
import {
  MeetingEventsBus,
  MeetingParticipantJoinedEvent,
  type MeetingEvent,
} from '@domain'
import { singleton } from 'tsyringe'
import type { MeetingSocket } from './meeting-sockets-types'

@singleton()
export class MeetingEventsSocketsBroadcaster extends MeetingEventsBus {
  private sockets: MeetingSocket[] = []

  constructor(
    private meetingParticipantJoinedEventDtoMapper: MeetingParticipantJoinedEventDtoMapper
  ) {
    super()
  }

  notify(event: MeetingEvent): void {
    const meetingSockets = this.sockets.filter(
      (x) =>
        x.data.meetingId === event.meetingId() &&
        x.data.auth?.userId !== event.originatingMeetingParticipantId()
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

  registerSocket(
    socket: MeetingSocket,
    data: MeetingWithAuthInformationDto
  ): void {
    socket.data = { auth: data.authInfo, meetingId: data.meeting.id }
    this.sockets.push(socket)
  }
}
