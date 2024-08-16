import { type TimeProvider } from '@yucacodes/es'
import type { Meeting, Participant } from '../models'
import { MeetingEvent } from './meeting-event'

export type ParticipantDisconnectedEventFactoryProps = {
  meeting: Meeting
  participant: Participant
  timeProvider: TimeProvider
}

export interface ParticipantDisconnectedEventProps {
  meeting: Meeting
  participant: Participant
  time: Date
}

export class ParticipantDisconnectedEvent extends MeetingEvent {
  static factory(
    props: ParticipantDisconnectedEventFactoryProps
  ): ParticipantDisconnectedEvent {
    return new ParticipantDisconnectedEvent({
      participant: props.participant,
      meeting: props.meeting,
      time: props.timeProvider.now(),
    })
  }

  constructor(private props: ParticipantDisconnectedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meeting.id()
  }

  participant(): Participant {
    return this.props.participant
  }

  time(): Date {
    return new Date(this.props.time)
  }
}
