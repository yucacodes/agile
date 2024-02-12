import type { MeetingEvent } from '../events/meeting-event'

export abstract class MeetingEventsBus {
  abstract notify(event: MeetingEvent): void
}
