import {
  ManagerCloseVoting,
  ManagerClosedVotingEventDtoMapper,
  ManagerStartVoting,
  ManagerStartedVotingEventDtoMapper,
  MeetingParticipantDisconnectedEventDtoMapper,
  ParticipantDisconectedFromMeeting,
  ParticipantVotes,
  UserCreateMeeting,
  UserJoinMeeting,
} from '@application'
import {
  ParticipantDisconnectedEvent,
  VotingClosedEvent,
  VotingStartedEvent,
} from '@domain'
import { Server, server } from '@framework/infrastructure'

@server({
  controllers: [
    { event: 'StartMeeting', useCase: UserCreateMeeting },
    { event: 'JoinMeeting', useCase: UserJoinMeeting },
    { event: 'StartVoting', useCase: ManagerStartVoting },
    { event: 'Vote', useCase: ParticipantVotes },
    { event: 'ClosedVoting', useCase: ManagerCloseVoting },
    { event: 'disconnect', useCase: ParticipantDisconectedFromMeeting },
  ],
  emitters: [
    {
      model: VotingClosedEvent,
      event: 'VotingClosed',
      mapper: ManagerClosedVotingEventDtoMapper,
    },
    {
      model: VotingStartedEvent,
      event: 'VotingStarted',
      mapper: ManagerStartedVotingEventDtoMapper,
    },
    {
      model: ParticipantDisconnectedEvent,
      event: 'ParticipantDisconnected',
      mapper: MeetingParticipantDisconnectedEventDtoMapper,
    },
  ],
})
export class AgileServer extends Server {}
