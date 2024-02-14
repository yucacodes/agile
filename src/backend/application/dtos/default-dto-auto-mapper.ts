import { AutoMapper, autoMapper } from '@framework/application'
import { ManagerClosedVotingEventDtoMapper } from './manager-closed-voting-event-dto'
import { ManagerStartedVotingEventDtoMapper } from './manager-started-voting-event-dto'

@autoMapper([
  ManagerClosedVotingEventDtoMapper,
  ManagerStartedVotingEventDtoMapper,
])
export class DefaultDtoAutoMapper extends AutoMapper {}
