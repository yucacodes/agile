import { type TimeManager } from '@framework/domain'
import { type Voting, type MeetingParticipant } from '../models'
import { MeetingEvent } from './meeting-event'

export interface MeetingParticipantVotedEventFactoryProps {
  meetingParticipant: MeetingParticipant
  votingId: Voting
}

export interface MeetingParticipantVotedEventProps {
  meetingParticipant: MeetingParticipant
  votingId: Voting
  isOpen: boolean
}

export class MeetingParticipantVotedEvent extends MeetingEvent {
  static factory(
    props: MeetingParticipantVotedEventFactoryProps
  ): MeetingParticipantVotedEvent {
    return new MeetingParticipantVotedEvent({
      meetingParticipant: props.meetingParticipant,
      votingId: props.votingId,
      isOpen: false,
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

  votinId(): Voting {
    return this.props.votingId
  }

  isOpen(timeManager: TimeManager): boolean {
    return this.props.votingId.isOpen(timeManager)
  }
}
