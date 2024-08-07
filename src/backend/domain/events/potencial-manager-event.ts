import type { Meeting, Participant } from '../models'
import { MeetingEvent } from './meeting-event'

export type PotentialManagerEventFactoryProps = {
  meeting: Meeting
  participant: Participant
}

export interface PotentialManagerEventProps {
  meeting: Meeting
  participant: Participant
}

export class PotentialManagerEvent extends MeetingEvent {
  static factory(
    props: PotentialManagerEventFactoryProps
  ): PotentialManagerEvent {
    return new PotentialManagerEvent({
      participant: props.participant,
      meeting: props.meeting,
    })
  }

  constructor(private props: PotentialManagerEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meeting.id()
  }

  participant(): Participant {
    return this.props.participant
  }
}
