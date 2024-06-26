import {
  ManagerCloseVoting,
  ManagerStartVoting,
  ParticipantDisconectedFromMeeting,
  ParticipantDisconnectedEventDtoMapper,
  ParticipantReconnectToMeeting,
  ParticipantJoinedEventDtoMapper,
  ParticipantVotedEventDtoMapper,
  ParticipantVotes,
  UserCreateMeeting,
  UserJoinMeeting,
  UserRefreshSession,
  VotingClosedEventDtoMapper,
  VotingStartedEventDtoMapper,
} from '@application'
import {
  ParticipantDisconnectedEvent,
  ParticipantJoinedEvent,
  ParticipantVotedEvent,
  VotingClosedEvent,
  VotingStartedEvent,
} from '@domain'
import { NODE_ENV, Server, server } from '@framework'
import { SocketAuthProvider, emit, listen } from '@presentation'
import {
  RedisMeetingsRepository,
  RedisRefreshTokensRepository,
} from './redis-repositories'
import {
  SqliteMeetingsRepository,
  SqliteRefreshTokensRepository,
} from './sqlite-repositories'

@server({
  authProviders: [SocketAuthProvider],
  controllers: [
    { event: listen.Vote, useCase: ParticipantVotes },
    { event: listen.StartMeeting, useCase: UserCreateMeeting },
    { event: listen.JoinMeeting, useCase: UserJoinMeeting },
    { event: listen.StartVoting, useCase: ManagerStartVoting },
    { event: listen.CloseVoting, useCase: ManagerCloseVoting },
    { event: listen.Disconnect, useCase: ParticipantDisconectedFromMeeting },
    { event: listen.RefreshSession, useCase: UserRefreshSession },
    { event: listen.ReconectToMeeting, useCase: ParticipantReconnectToMeeting },
  ],
  emitters: [
    {
      model: ParticipantJoinedEvent,
      event: emit.ParticipantJoined,
      mapper: ParticipantJoinedEventDtoMapper,
    },
    {
      model: ParticipantVotedEvent,
      event: emit.ParticipantVoted,
      mapper: ParticipantVotedEventDtoMapper,
    },
    {
      model: VotingClosedEvent,
      event: emit.VotingClosed,
      mapper: VotingClosedEventDtoMapper,
    },
    {
      model: VotingStartedEvent,
      event: emit.VotingStarted,
      mapper: VotingStartedEventDtoMapper,
    },
    {
      model: ParticipantDisconnectedEvent,
      event: emit.ParticipantDisconnected,
      mapper: ParticipantDisconnectedEventDtoMapper,
    },
  ],
  implementations: [
    NODE_ENV === 'production' && [
      RedisMeetingsRepository,
      RedisRefreshTokensRepository,
    ],
    NODE_ENV === 'development' && [
      SqliteMeetingsRepository,
      SqliteRefreshTokensRepository,
    ],
  ],
})
export class AgileServer extends Server {}
