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
import { NODE_ENV } from '@framework'
import { Server, server } from '@framework'
import { emit } from '../presentation/emited-events'
import { listen } from '../presentation/listen-events'
import { SocketAuthProvider } from '../presentation/socket-auth-provider'
import { DummyMeetingsRepository } from './dummy-repositories'
import { RedisMeetingsRepository } from './redis-repositories'

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
  implementations: [
    NODE_ENV === 'production' && [RedisMeetingsRepository],
    NODE_ENV === 'development' && [DummyMeetingsRepository],
  ],
})
export class AgileServer extends Server {}
