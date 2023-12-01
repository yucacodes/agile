import { Entity, type EntityProps } from './entity'
import { type Meeting } from './meeting'
import type { User } from './user'

export interface MeetingParticipantProps extends EntityProps {
  userId: string
  meetingId: string
  name: string
  isManager: boolean
  isConnected: boolean
}

export interface MeetingParticipantFactoryProps {
  user: User
  meeting: Meeting
  name: string
  isManager?: boolean
}

export class MeetingParticipant extends Entity<MeetingParticipantProps> {
  static factory(props: MeetingParticipantFactoryProps): MeetingParticipant {
    return new MeetingParticipant({
      ...this.factoryBaseProps(),
      userId: props.user.id(),
      meetingId: props.meeting.id(),
      name: props.name,
      isManager: props.isManager ?? false,
      isConnected: true,
    })
  }

  meetingId(): string {
    return this.props.meetingId
  }

  name(): string {
    return this.props.name
  }

  setAsDisconnected() {
    this.props.isConnected = false
  }

  setAsConnected() {
    this.props.isConnected = true
  }

  validate(): void {
    // TODO: implement
  }
}
