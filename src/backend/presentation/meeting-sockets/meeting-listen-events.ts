import {
  type ParticipantVotesRequestDto,
  type MeetingWithAuthInformationDto,
  type UserCreateMeetingRequestDto,
  type UserJoinMeetingRequestDto,
  type VotingInformationDto,
  type ManagerStarteVotingRequestDto,
  type ManagerCloseVotingRequestDto,
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
  UserVoting: SocketListener<ParticipantVotesRequestDto, VotingInformationDto>
  ManagerStartedVoting: SocketListener<
    ManagerStarteVotingRequestDto,
    MeetingWithAuthInformationDto
  >
  ManagerClosedVoting: SocketListener<
    ManagerCloseVotingRequestDto,
    MeetingWithAuthInformationDto
  >
}
