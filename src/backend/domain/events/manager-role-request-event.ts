import type { Meeting, Participant } from '../models'
import { MeetingEvent } from './meeting-event'

export type ManagerRoleRequestEventFactoryProps = {
  meeting: Meeting
  participant: Participant
}

export interface ManagerRoleRequestEventProps {
  meeting: Meeting
  participant: Participant
}

export class ManagerRoleRequestEvent extends MeetingEvent {
  static factory(
    props: ManagerRoleRequestEventFactoryProps
  ): ManagerRoleRequestEvent {
    return new ManagerRoleRequestEvent({
      participant: props.participant,
      meeting: props.meeting,
    })
  }

  constructor(private props: ManagerRoleRequestEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meeting.id()
  }

  participant(): Participant {
    return this.props.participant
  }
}
