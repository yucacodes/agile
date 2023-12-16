import { MeetingEventsBus, MeetingsRepository, TimeManager } from '@domain'
import { container } from '@injection'
import {
  MeetingSocketsEventsBus,
  MeetingsDummyRepository,
  ServerTimeManager,
} from '@infrastructure'

// TimeManager
container.registerType(TimeManager as any, ServerTimeManager)

// Repositories
container.registerType(MeetingsRepository as any, MeetingsDummyRepository)

// Events Buses
container.registerType(MeetingEventsBus as any, MeetingSocketsEventsBus)

