import {
  type MeetingParticipantVotedEventDto,
  type MeetingParticipantDisconnectedEventDto,
  type MeetingParticipantJoinedEventDto,
  type ManagerStartedVotingEventDto,
  type ManagerClosedVotingEventDto,
} from '@application'
import { type SocketEmit } from '@framework/presentation'

// ----- Events that server emit, and client listen -----
export type MeetingEmmitedEventsMap = {
  ParticipantJoined: SocketEmit<MeetingParticipantJoinedEventDto>
  ParticipantDisconnected: SocketEmit<MeetingParticipantDisconnectedEventDto>
  ParticipantVoted: SocketEmit<MeetingParticipantVotedEventDto>
  ManagerStartedVoting: SocketEmit<ManagerStartedVotingEventDto>
  ManagerClosedVoting: SocketEmit<ManagerClosedVotingEventDto>
}

export type MeetingEmmitedEvent = keyof MeetingEmmitedEventsMap
