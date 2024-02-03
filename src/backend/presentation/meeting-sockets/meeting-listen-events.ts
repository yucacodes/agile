import {
  type UserVotingRequestDto,
  type MeetingWithAuthInformationDto,
  type UserCreateMeetingRequestDto,
  type UserJoinMeetingRequestDto,
  type VotingInformationDto,
  type ManagerStartedVotingRequestDto,
  type ManagerClosedVotingRequestDto,
} from '@application'
import { type SocketListener } from '@framework/presentation'

// ------ Events that client emit and server listen -----

export type MeetingListenEventsMap = {
  StartMeeting: SocketListener<
    UserCreateMeetingRequestDto,
    MeetingWithAuthInformationDto
  >
  JoinMeeting: SocketListener<
    UserJoinMeetingRequestDto,
    MeetingWithAuthInformationDto
  >
  UserVoting: SocketListener<UserVotingRequestDto, VotingInformationDto>
  ManagerStartedVoting: SocketListener<
    ManagerStartedVotingRequestDto,
    MeetingWithAuthInformationDto
  >
  ManagerClosedVoting: SocketListener<
    ManagerClosedVotingRequestDto,
    MeetingWithAuthInformationDto
  >
}
