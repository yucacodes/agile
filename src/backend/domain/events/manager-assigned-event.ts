import type { Meeting, Participant } from '../models'
import { MeetingEvent } from './meeting-event'

export type ManagerAssignedEventFactoryProps = {
  meeting: Meeting
  participant: Participant
}

export interface ManagerAssignedEventProps {
  meeting: Meeting
  participant: Participant
}

export class ManagerAssignedEvent extends MeetingEvent {
  static factory(
    props: ManagerAssignedEventFactoryProps
  ): ManagerAssignedEvent {
    return new ManagerAssignedEvent({
      participant: props.participant,
      meeting: props.meeting,
    })
  }

  constructor(private props: ManagerAssignedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meeting.id()
  }

  participant(): Participant {
    return this.props.participant
  }
}
