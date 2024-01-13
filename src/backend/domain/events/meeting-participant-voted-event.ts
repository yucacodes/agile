import { type TimeManager } from '@framework/domain'
import { type Voting, type MeetingParticipant } from '../models'
import { MeetingEvent } from './meeting-event'

export interface MeetingParticipantVotedEventFactoryProps {
  meetingParticipant: MeetingParticipant
  voting: Voting
}

export interface MeetingParticipantVotedEventProps {
  meetingParticipant: MeetingParticipant
  voting: Voting
  votingClosed: boolean
}

export class MeetingParticipantVotedEvent extends MeetingEvent {
  static factory(
    props: MeetingParticipantVotedEventFactoryProps
  ): MeetingParticipantVotedEvent {
    return new MeetingParticipantVotedEvent({
      meetingParticipant: props.meetingParticipant,
      voting: props.voting,
      votingClosed: false,
    })
  }

  constructor(private props: MeetingParticipantVotedEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meetingParticipant.meetingId()
  }

  meetingParticipant(): MeetingParticipant {
    return this.props.meetingParticipant
  }

  voting(): string {
    return this.props.voting.id()
  }

  votingClosed(timeManager: TimeManager): boolean {
    return this.props.voting.isOpen(timeManager)
  }
}
