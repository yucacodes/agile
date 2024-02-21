import { type SocketListener } from '@framework/presentation'
import type {
  ManagerCloseVotingRequestDto,
  ManagerStartVotingRequestDto,
  MeetingAndAuthInfoDto,
  MeetingDto,
  ParticipantVotesRequestDto,
  UserCreateMeetingRequestDto,
  UserJoinMeetingRequestDto,
} from '../application/dtos'

/* ------ Events that client emit and server listen ----- */
export const listen = {
  StartMeeting: 'StartMeeting',
  JoinMeeting: 'JoinMeeting',
  StartVoting: 'StartVoting',
  Vote: 'Vote',
  CloseVoting: 'CloseVoting',
  Disconnect: 'disconnect',
} as const

// Requests And Responses types
export type ListenEventsMap = {
  [listen.StartMeeting]: SocketListener<
    UserCreateMeetingRequestDto,
    MeetingAndAuthInfoDto
  >
  [listen.JoinMeeting]: SocketListener<UserJoinMeetingRequestDto, MeetingAndAuthInfoDto>
  [listen.StartVoting]: SocketListener<ParticipantVotesRequestDto, void>
  [listen.Vote]: SocketListener<
    ManagerStartVotingRequestDto,
    MeetingAndAuthInfoDto
  >
  [listen.CloseVoting]: SocketListener<
    ManagerCloseVotingRequestDto,
    MeetingAndAuthInfoDto
  >
}
