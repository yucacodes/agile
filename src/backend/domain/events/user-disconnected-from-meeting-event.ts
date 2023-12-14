import type { MeetingParticipant } from '../models'
import { MeetingEvent } from './meeting-event'

export type UserDisconnectedFromMeetingEventFactoryProps = {
  meetingParticipant: MeetingParticipant
}

export interface UserDisconnectedFromMeetingEventProps {
  meetingParticipant: MeetingParticipant
  time: Date
}

export class UserDisconnectedFromMeetingEvent extends MeetingEvent {
  static factory(
    props: UserDisconnectedFromMeetingEventFactoryProps
  ): UserDisconnectedFromMeetingEvent {
    return new UserDisconnectedFromMeetingEvent({
      meetingParticipant: props.meetingParticipant,
      time: new Date(),
    })
  }

  constructor(private props: UserDisconnectedFromMeetingEventProps) {
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
