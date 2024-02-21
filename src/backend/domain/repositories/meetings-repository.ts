import type { Meeting } from '../models'

export abstract class MeetingsRepository {
  abstract findById(id: string): Promise<Meeting | null>
  abstract saveNew(entity: Meeting): Promise<void> 
  abstract saveUpdate(entity: Meeting): Promise<void>
}
