import type { SocketEmit } from '@framework'
import type {
  VotingClosedEventDto,
  VotingStartedEventDto,
  ParticipantDisconnectedEventDto,
  ParticipantJoinedEventDto,
  ParticipantVotedEventDto,
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
  [emit.ParticipantJoined]: SocketEmit<ParticipantJoinedEventDto>
  [emit.ParticipantDisconnected]: SocketEmit<ParticipantDisconnectedEventDto>
  [emit.ParticipantVoted]: SocketEmit<ParticipantVotedEventDto>
  [emit.VotingStarted]: SocketEmit<VotingStartedEventDto>
  [emit.VotingClosed]: SocketEmit<VotingClosedEventDto>
}
