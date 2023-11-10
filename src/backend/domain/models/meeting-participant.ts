import { Entity, EntityProps } from './entity'

export const MeetingParticipantRolesValues = ['Manager', 'Participant'] as const

export type MeetingParticipantRole =
  (typeof MeetingParticipantRolesValues)[number]

export interface MeetingParticipantProps extends EntityProps {
  name: string
  roles: MeetingParticipantRole[]
  isConnected: boolean
}

export interface MeetingParticipantFactoryProps {
  name: string
  roles: MeetingParticipantRole[]
}

export class MeetingParticipant extends Entity<MeetingParticipantProps> {
  static factory(props: MeetingParticipantFactoryProps): MeetingParticipant {
    return new MeetingParticipant({
      ...this.factoryBaseProps(),
      name: props.name,
      roles: props.roles,
      isConnected: true,
    })
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
    throw new Error('Method not implemented.')
  }
}
