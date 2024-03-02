import { type SocketListener } from '@framework'
import type {
  ManagerCloseVoting,
  ManagerStartVoting,
  ParticipantGetMeeting,
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
  GetMeeting: 'GetMeeting',
} as const

// Requests And Responses types
export type ListenEventsMap = {
  [listen.StartMeeting]: SocketListener<UserCreateMeeting>
  [listen.JoinMeeting]: SocketListener<UserJoinMeeting>
  [listen.StartVoting]: SocketListener<ManagerStartVoting>
  [listen.Vote]: SocketListener<ParticipantVotes>
  [listen.CloseVoting]: SocketListener<ManagerCloseVoting>
  [listen.RefreshSession]: SocketListener<UserRefreshSession>
  [listen.GetMeeting]: SocketListener<ParticipantGetMeeting>
}
