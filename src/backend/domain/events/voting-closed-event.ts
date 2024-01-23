import type { MeetingParticipant, Voting } from '../models'
import { MeetingEvent } from './meeting-event'

export type VotingClosedEventFactoryProps = {
  meetingParticipant: MeetingParticipant
  voting: Voting
}

export interface VotingClosedEventProps {
  meetingParticipant: MeetingParticipant
  voting: Voting
  time: Date
}

export class VotingClosedEvent extends MeetingEvent {
  static factory(props: VotingClosedEventFactoryProps): VotingClosedEvent {
    return new VotingClosedEvent({
      meetingParticipant: props.meetingParticipant,
      voting: props.voting,
      time: new Date(),
    })
  }

  constructor(private props: VotingClosedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meetingParticipant.meetingId()
  }

  meetingParticipant(): MeetingParticipant {
    return this.props.meetingParticipant
  }

  voting(): Voting {
    return this.props.voting
  }

  time(): Date {
    return new Date(this.props.time)
  }
}
