import type { SocketEmit } from '@framework'
import type {
  ManagerClosedVotingEventDto,
  ManagerStartedVotingEventDto,
  MeetingParticipantDisconnectedEventDto,
  MeetingParticipantJoinedEventDto,
  MeetingParticipantVotedEventDto,
} from '../application/dtos'

/* ----- Events that server emit, and client listen ----- */
export const emit = {
  ParticipantJoined: 'ParticipantJoined',
  ParticipantDisconnected: 'ParticipantDisconnected',
  ParticipantVoted: 'ParticipantVoted',
  VotingStarted: 'VotingStarted',
  VotingClosed: 'VotingClosed',
} as const

// types
export type EmmitedEventsMap = {
  ParticipantJoined: SocketEmit<MeetingParticipantJoinedEventDto>
  ParticipantDisconnected: SocketEmit<MeetingParticipantDisconnectedEventDto>
  ParticipantVoted: SocketEmit<MeetingParticipantVotedEventDto>
  ManagerStartedVoting: SocketEmit<ManagerStartedVotingEventDto>
  ManagerClosedVoting: SocketEmit<ManagerClosedVotingEventDto>
}
