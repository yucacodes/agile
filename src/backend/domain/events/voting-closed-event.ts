import { type TimeProvider } from '@yucacodes/es'
import type { Meeting, Voting } from '../models'
import { MeetingEvent } from './meeting-event'

export type VotingClosedEventFactoryProps = {
  meeting: Meeting
  voting: Voting
  timeProvider: TimeProvider
}

export interface VotingClosedEventProps {
  meeting: Meeting
  voting: Voting
  time: Date
}

export class VotingClosedEvent extends MeetingEvent {
  static factory(props: VotingClosedEventFactoryProps): VotingClosedEvent {
    return new VotingClosedEvent({
      meeting: props.meeting,
      voting: props.voting,
      time: props.timeProvider.now(),
    })
  }

  constructor(private props: VotingClosedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meeting.id()
  }

  voting(): Voting {
    return this.props.voting
  }

  time(): Date {
    return new Date(this.props.time)
  }
}
