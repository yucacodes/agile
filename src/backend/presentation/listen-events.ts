import { type SocketListener } from '@yucacodes/es'
import type {
  ManagerCloseVoting,
  ManagerStartVoting,
  ParticipantReconnectToMeeting,
  ParticipantVotes,
  UserCreateMeeting,
  UserJoinMeeting,
  UserRefreshSession,
} from '../application'

/* ------ Events that client emit and server listen ----- */
export const listen = {
  StartMeeting: 'StartMeeting',
  JoinMeeting: 'JoinMeeting',
  StartVoting: 'StartVoting',
  Vote: 'Vote',
  CloseVoting: 'CloseVoting',
  Disconnect: 'disconnect',
  RefreshSession: 'RefreshSession',
  ReconectToMeeting: 'ReconectToMeeting',
} as const

// Requests And Responses types
export type ListenEventsMap = {
  [listen.StartMeeting]: SocketListener<UserCreateMeeting>
  [listen.JoinMeeting]: SocketListener<UserJoinMeeting>
  [listen.StartVoting]: SocketListener<ManagerStartVoting>
  [listen.Vote]: SocketListener<ParticipantVotes>
  [listen.CloseVoting]: SocketListener<ManagerCloseVoting>
  [listen.RefreshSession]: SocketListener<UserRefreshSession>
  [listen.ReconectToMeeting]: SocketListener<ParticipantReconnectToMeeting>
}
