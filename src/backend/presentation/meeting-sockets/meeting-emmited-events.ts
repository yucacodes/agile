import {
  type MeetingParticipantVotedEventDto,
  type MeetingParticipantDisconnectedEventDto,
  type MeetingParticipantJoinedEventDto,
  type MeetingParticipantStartedVoteEventDto,
  type MeetingParticipantClosedVoteEventDto,
} from '@application'
import { type SocketEmit } from '@framework/presentation'

// ----- Events that server emit, and client listen -----
export type MeetingEmmitedEventsMap = {
  ParticipantJoined: SocketEmit<MeetingParticipantJoinedEventDto>
  ParticipantDisconnected: SocketEmit<MeetingParticipantDisconnectedEventDto>
  ParticipantVoted: SocketEmit<MeetingParticipantVotedEventDto>
  ParticipantStartedVote: SocketEmit<MeetingParticipantStartedVoteEventDto>
  ParticipantClosedVote: SocketEmit<MeetingParticipantClosedVoteEventDto>
}

export type MeetingEmmitedEvent = keyof MeetingEmmitedEventsMap
