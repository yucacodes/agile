import {
  type ParticipantVotesRequestDto,
  type MeetingAndSecretDto,
  type UserCreateMeetingRequestDto,
  type UserJoinMeetingRequestDto,
  type ManagerStartVotingRequestDto,
  type ManagerCloseVotingRequestDto,
} from '@application'
import { type SocketListener } from '@framework/presentation'

// ------ Events that client emit and server listen -----

export type MeetingListenEventsMap = {
  StartMeeting: SocketListener<UserCreateMeetingRequestDto, MeetingAndSecretDto>
  JoinMeeting: SocketListener<UserJoinMeetingRequestDto, MeetingAndSecretDto>
  UserVoting: SocketListener<ParticipantVotesRequestDto, void>
  ManagerStartedVoting: SocketListener<
    ManagerStartVotingRequestDto,
    MeetingAndSecretDto
  >
  ManagerClosedVoting: SocketListener<
    ManagerCloseVotingRequestDto,
    MeetingAndSecretDto
  >
}
