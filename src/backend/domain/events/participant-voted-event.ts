import { type TimeProvider } from '@framework/domain'
import { type Voting, type Participant, type Meeting } from '../models'
import { MeetingEvent } from './meeting-event'

export interface ParticipantVotedEventFactoryProps {
  meeting: Meeting
  voting: Voting
  participant: Participant
  timeProvider: TimeProvider
}

export interface ParticipantVotedEventProps {
  meeting: Meeting
  voting: Voting
  participant: Participant
  time: Date
}

export class ParticipantVotedEvent extends MeetingEvent {
  static factory(
    props: ParticipantVotedEventFactoryProps
  ): ParticipantVotedEvent {
    return new ParticipantVotedEvent({
      meeting: props.meeting,
      voting: props.voting,
      participant: props.participant,
      time: props.timeProvider.now(),
    })
  }

  constructor(private props: ParticipantVotedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meeting.id()
  }

  participant(): Participant {
    return this.props.participant
  }

  votingId(): string {
    return this.props.voting.id()
  }

  isVotingClosed(): boolean {
    return !this.props.voting.isOpen()
  }
}
