import {
  ManagerCloseVoting,
  ManagerClosedVotingEventDtoMapper,
  ManagerStartVoting,
  ManagerStartedVotingEventDtoMapper,
  MeetingParticipantDisconnectedEventDtoMapper,
  MeetingParticipantJoinedEventDtoMapper,
  MeetingParticipantVotedEventDtoMapper,
  ParticipantDisconectedFromMeeting,
  ParticipantVotes,
  UserCreateMeeting,
  UserJoinMeeting,
} from '@application'
import {
  ParticipantDisconnectedEvent,
  ParticipantJoinedEvent,
  ParticipantVotedEvent,
  VotingClosedEvent,
  VotingStartedEvent,
} from '@domain'
import { Server, server } from '@framework/infrastructure'
import { emit } from '../presentation/emited-events'
import { listen } from '../presentation/listen-events'
import { SocketAuthProvider } from '../presentation/socket-auth-provider'

@server({
  authProviders: [SocketAuthProvider],
  controllers: [
    { event: listen.Vote, useCase: ParticipantVotes },
    { event: listen.StartMeeting, useCase: UserCreateMeeting },
    { event: listen.JoinMeeting, useCase: UserJoinMeeting },
    { event: listen.StartVoting, useCase: ManagerStartVoting },
    { event: listen.CloseVoting, useCase: ManagerCloseVoting },
    { event: listen.Disconnect, useCase: ParticipantDisconectedFromMeeting },
  ],
  emitters: [
    {
      model: ParticipantJoinedEvent,
      event: emit.ParticipantJoined,
      mapper: MeetingParticipantJoinedEventDtoMapper,
    },
    {
      model: ParticipantVotedEvent,
      event: emit.ParticipantVoted,
      mapper: MeetingParticipantVotedEventDtoMapper,
    },
    {
      model: VotingClosedEvent,
      event: emit.VotingClosed,
      mapper: ManagerClosedVotingEventDtoMapper,
    },
    {
      model: VotingStartedEvent,
      event: emit.VotingClosed,
      mapper: ManagerStartedVotingEventDtoMapper,
    },
    {
      model: ParticipantDisconnectedEvent,
      event: emit.ParticipantDisconnected,
      mapper: MeetingParticipantDisconnectedEventDtoMapper,
    },
  ],
})
export class AgileServer extends Server {}
