import type { MeetingParticipant, Voting } from '../models'
import { MeetingEvent } from './meeting-event'

export type MeetingParticipantClosedVoteEventFactoryProps = {
  meetingParticipant: MeetingParticipant
  voting: Voting
}

export interface MeetingParticipantClosedVoteEventProps {
  meetingParticipant: MeetingParticipant
  voting: Voting
  time: Date
}

export class MeetingParticipantClosedVoteEvent extends MeetingEvent {
  static factory(
    props: MeetingParticipantClosedVoteEventFactoryProps
  ): MeetingParticipantClosedVoteEvent {
    return new MeetingParticipantClosedVoteEvent({
      meetingParticipant: props.meetingParticipant,
      voting: props.voting,
      time: new Date(),
    })
  }

  constructor(private props: MeetingParticipantClosedVoteEventProps) {
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

  time(): Date {
    return new Date(this.props.time)
  }
}
