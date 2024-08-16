import { AutoMapper, autoMapper } from '@yucacodes/es'
import {
  VotingClosedEventDtoMapper,
  VotingStartedEventDtoMapper,
} from './models'

@autoMapper([
  VotingClosedEventDtoMapper,
  VotingStartedEventDtoMapper,
])
export class DtoAutoMapper extends AutoMapper {}
