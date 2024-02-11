import type { MeetingParticipant, Voting } from '../models'
import { MeetingEvent } from './meeting-event'

export type VotingStartedEventFactoryProps = {
  meetingParticipant: MeetingParticipant
  voting: Voting
}

export interface VotingStartedEventProps {
  meetingParticipant: MeetingParticipant
  voting: Voting
  time: Date
}

export class VotingStartedEvent extends MeetingEvent {
  static factory(props: VotingStartedEventFactoryProps): VotingStartedEvent {
    return new VotingStartedEvent({
      meetingParticipant: props.meetingParticipant,
      voting: props.voting,
      time: new Date(),
    })
  }

  constructor(private props: VotingStartedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meetingParticipant.meetingId()
  }

  voting(): string {
    return this.props.voting.id()
  }

  time(): Date {
    return new Date(this.props.time)
  }
}
