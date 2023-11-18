import { type MeetingParticipant } from '../models'
import { MeetingEvent } from './meeting-event'

export interface MeetingParticipantJoinedEventFactoryProps {
  meetingParticipant: MeetingParticipant
}

export interface MeetingParticipantJoinedEventProps {
  meetingParticipant: MeetingParticipant
  time: Date
}

export class MeetingParticipantJoinedEvent extends MeetingEvent {
  static factory(
    props: MeetingParticipantJoinedEventFactoryProps
  ): MeetingParticipantJoinedEvent {
    return new MeetingParticipantJoinedEvent({
      meetingParticipant: props.meetingParticipant,
      time: new Date(),
    })
  }

  constructor(private props: MeetingParticipantJoinedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meetingParticipant.meetingId()
  }

  originatingMeetingParticipantId(): string {
    return this.props.meetingParticipant.id()
  }

  meetingParticipant(): MeetingParticipant {
    return this.props.meetingParticipant
  }

  time(): Date {
    return new Date(this.props.time)
  }
}
