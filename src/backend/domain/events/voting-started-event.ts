import { type TimeProvider } from '@yucacodes/es'
import type { Meeting, Voting } from '../models'
import { MeetingEvent } from './meeting-event'

export type VotingStartedEventFactoryProps = {
  meeting: Meeting
  voting: Voting
  timeProvider: TimeProvider
}

export interface VotingStartedEventProps {
  meeting: Meeting
  voting: Voting
  time: Date
}

export class VotingStartedEvent extends MeetingEvent {
  static factory(props: VotingStartedEventFactoryProps): VotingStartedEvent {
    return new VotingStartedEvent({
      meeting: props.meeting,
      voting: props.voting,
      time: props.timeProvider.now(),
    })
  }

  constructor(private props: VotingStartedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meeting.id()
  }

  votingId(): string {
    return this.props.voting.id()
  }

  time(): Date {
    return new Date(this.props.time)
  }
}
