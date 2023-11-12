import type { Meeting, MeetingProps } from '../models'
import { BaseRepository } from './base-repository'

export abstract class MeetingsRepository extends BaseRepository<
  MeetingProps,
  Meeting
> {}
