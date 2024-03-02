import { type SocketListener } from '@framework'
import type {
  ManagerCloseVoting,
  ManagerStartVoting,
  ParticipantVotes,
  UserCreateMeeting,
  UserJoinMeeting,
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
}
