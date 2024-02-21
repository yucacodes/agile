import { type TimeProvider } from '@framework'
import { type Meeting, type Participant } from '../models'
import { MeetingEvent } from './meeting-event'

export interface ParticipantJoinedEventFactoryProps {
  meeting: Meeting
  participant: Participant
  timeProvider: TimeProvider
}

export interface ParticipantJoinedEventProps {
  meeting: Meeting
  participant: Participant
  time: Date
}

export class ParticipantJoinedEvent extends MeetingEvent {
  static factory(
    props: ParticipantJoinedEventFactoryProps
  ): ParticipantJoinedEvent {
    return new ParticipantJoinedEvent({
      meeting: props.meeting,
      participant: props.participant,
      time: props.timeProvider.now(),
    })
  }

  constructor(private props: ParticipantJoinedEventProps) {
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
