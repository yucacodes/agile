import { Entity, type EntityProps } from './entity'
import { type Meeting } from './meeting'

export const MeetingParticipantRolesValues = ['Manager', 'Participant'] as const

export type MeetingParticipantRole =
  (typeof MeetingParticipantRolesValues)[number]

export interface MeetingParticipantProps extends EntityProps {
  meetingId: string
  name: string
  roles: MeetingParticipantRole[]
  isConnected: boolean
}

export interface MeetingParticipantFactoryProps {
  meeting: Meeting
  name: string
  roles: MeetingParticipantRole[]
}

export class MeetingParticipant extends Entity<MeetingParticipantProps> {
  static factory(props: MeetingParticipantFactoryProps): MeetingParticipant {
    return new MeetingParticipant({
      ...this.factoryBaseProps(),
      meetingId: props.meeting.id(),
      name: props.name,
      roles: props.roles,
      isConnected: true,
    })
  }

  meetingId(): string {
    return this.props.meetingId
  }

  name(): string {
    return this.props.name
  }

  roles(): readonly MeetingParticipantRole[] {
    return [...this.props.roles]
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
