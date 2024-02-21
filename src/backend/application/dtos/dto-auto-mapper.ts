import { AutoMapper, autoMapper } from '@framework'
import {
  VotingClosedEventDtoMapper,
  VotingStartedEventDtoMapper,
} from './models'

@autoMapper([
  VotingClosedEventDtoMapper,
  VotingStartedEventDtoMapper,
])
export class DtoAutoMapper extends AutoMapper {}
