import type { MeetingParticipant } from '../models'
import { MeetingEvent } from './meeting-event'

export type MeetingParticipantStartedVoteEventFactoryProps = {
  meetingParticipant: MeetingParticipant
}

export interface MeetingParticipantStartedVoteEventProps {
  meetingParticipant: MeetingParticipant
  time: Date
}

export class MeetingParticipantStartedVoteEvent extends MeetingEvent {
  static factory(
    props: MeetingParticipantStartedVoteEventFactoryProps
  ): MeetingParticipantStartedVoteEvent {
    return new MeetingParticipantStartedVoteEvent({
      meetingParticipant: props.meetingParticipant,
      time: new Date(),
    })
  }

  constructor(private props: MeetingParticipantStartedVoteEventProps) {
    super()
  }

  meetingId(): string {
    return this.props.meetingParticipant.meetingId()
  }

  meetingParticipant(): MeetingParticipant {
    return this.props.meetingParticipant
  }

  time(): Date {
    return new Date(this.props.time)
  }
}
