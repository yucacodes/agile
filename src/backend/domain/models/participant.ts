import { Model } from '../core/model'
import type { User } from './user'

export interface ParticipantProps {
  userId: string
  name: string
  isManager: boolean
  isConnected: boolean
}

export interface ParticipantFactoryProps {
  user: User
  name: string
  isManager?: boolean
}

export class Participant extends Model<ParticipantProps> {
  static factory(props: ParticipantFactoryProps): Participant {
    return new Participant({
      userId: props.user.id(),
      name: props.name,
      isManager: props.isManager ?? false,
      isConnected: true,
    })
  }  

  userId(): string {
    return this.props.userId
  }

  isManager(): boolean {
    return this.props.isManager
  }

  isConnected(): boolean {
    return this.props.isConnected
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
}
