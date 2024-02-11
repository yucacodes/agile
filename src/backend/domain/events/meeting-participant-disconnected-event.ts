import type { MeetingParticipant } from '../models'
import { MeetingEvent } from './meeting-event'

export type MeetingParticipantDisconnectedEventFactoryProps = {
  meetingParticipant: MeetingParticipant
}

export interface MeetingParticipantDisconnectedEventProps {
  meetingParticipant: MeetingParticipant
  time: Date
}

export class MeetingParticipantDisconnectedEvent extends MeetingEvent {
  static factory(
    props: MeetingParticipantDisconnectedEventFactoryProps
  ): MeetingParticipantDisconnectedEvent {
    return new MeetingParticipantDisconnectedEvent({
      meetingParticipant: props.meetingParticipant,
      time: new Date(),
    })
  }

  constructor(private props: MeetingParticipantDisconnectedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meetingParticipant.meetingId()
  }

  meetingParticipant(): MeetingParticipant {
    return this.props.meetingParticipant
  }

  time(): Date {
    return new Date(this.props.time)
  }
}
