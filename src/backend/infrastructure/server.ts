import {
  ManagerCloseVoting,
  ManagerClosedVotingEventDtoMapper,
  ManagerStartVoting,
  ManagerStartedVotingEventDtoMapper,
  MeetingParticipantDisconnectedEventDtoMapper,
  MeetingParticipantVotedEventDtoMapper,
  ParticipantDisconectedFromMeeting,
  ParticipantVotes,
  UserCreateMeeting,
  UserJoinMeeting,
} from '@application'
import {
  ParticipantDisconnectedEvent,
  ParticipantVotedEvent,
  VotingClosedEvent,
  VotingStartedEvent,
} from '@domain'
import { Server, server } from '@framework/infrastructure'
import { emit } from '../presentation/emited-events'
import { listen } from '../presentation/listen-events'

@server({
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
