import {
  ManagerCloseVoting,
  ManagerStartVoting,
  ParticipantDisconectedFromMeeting,
  ParticipantDisconnectedEventDtoMapper,
  ParticipantJoinedEventDtoMapper,
  ParticipantVotedEventDtoMapper,
  ParticipantVotes,
  UserCreateMeeting,
  UserJoinMeeting,
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
import { emit } from '../presentation/emited-events'
import { listen } from '../presentation/listen-events'
import { SocketAuthProvider } from '../presentation/socket-auth-provider'
import { RedisMeetingsRepository } from './redis-repositories'
import { SqliteMeetingsRepository } from './sqlite-repositories'

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
      event: emit.VotingClosed,
      mapper: VotingStartedEventDtoMapper,
    },
    {
      model: ParticipantDisconnectedEvent,
      event: emit.ParticipantDisconnected,
      mapper: ParticipantDisconnectedEventDtoMapper,
    },
  ],
  implementations: [
    NODE_ENV === 'production' && [RedisMeetingsRepository],
    NODE_ENV === 'development' && [SqliteMeetingsRepository],
  ],
})
export class AgileServer extends Server {}
