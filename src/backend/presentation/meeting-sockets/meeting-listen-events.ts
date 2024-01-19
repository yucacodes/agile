import {
  type UserVotingRequestDto,
  type MeetingWithAuthInformationDto,
  type UserCreateMeetingRequestDto,
  type UserJoinMeetingRequestDto,
  type VotingInformationDto,
  type UserStartVotingRequestDto,
  type UserCloseVotingRequestDto,
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
  UserStartVoting: SocketListener<
    UserStartVotingRequestDto,
    MeetingWithAuthInformationDto
  >
  UserCloseVoting: SocketListener<
    UserCloseVotingRequestDto,
    MeetingWithAuthInformationDto
  >
}
