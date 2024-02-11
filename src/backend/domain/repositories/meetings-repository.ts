import type { Meeting, MeetingProps } from '../models'
import { BaseRepository } from '@framework/domain'

export abstract class MeetingsRepository extends BaseRepository<
  MeetingProps,
  Meeting
> {}
