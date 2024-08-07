import type { SocketEmit } from '@framework'
import type {
  VotingClosedEventDto,
  VotingStartedEventDto,
  ParticipantDisconnectedEventDto,
  ParticipantJoinedEventDto,
  ParticipantVotedEventDto,
  PotentialManagerEventDto,
  ManagerRoleRequestEventDto,
} from '../application/dtos'

/* ----- Events that server emit, and client listen ----- */
export const emit = {
  ParticipantJoined: 'ParticipantJoined',
  ParticipantDisconnected: 'ParticipantDisconnected',
  ParticipantVoted: 'ParticipantVoted',
  VotingStarted: 'VotingStarted',
  VotingClosed: 'VotingClosed',
  PotentialManager: 'PotentialManager',
  ManagerRoleRequest: 'ManagerRoleRequest',
} as const

// types
export type EmmitedEventsMap = {
  [emit.ParticipantJoined]: SocketEmit<ParticipantJoinedEventDto>
  [emit.ParticipantDisconnected]: SocketEmit<ParticipantDisconnectedEventDto>
  [emit.ParticipantVoted]: SocketEmit<ParticipantVotedEventDto>
  [emit.VotingStarted]: SocketEmit<VotingStartedEventDto>
  [emit.VotingClosed]: SocketEmit<VotingClosedEventDto>
  [emit.PotentialManager]: SocketEmit<PotentialManagerEventDto>
  [emit.ManagerRoleRequest]: SocketEmit<ManagerRoleRequestEventDto>
}
