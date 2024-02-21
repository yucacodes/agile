import { AutoMapper, autoMapper } from '@framework/application'
import {
  ManagerClosedVotingEventDtoMapper,
  ManagerStartedVotingEventDtoMapper,
} from './models'

@autoMapper([
  ManagerClosedVotingEventDtoMapper,
  ManagerStartedVotingEventDtoMapper,
])
export class DtoAutoMapper extends AutoMapper {}
