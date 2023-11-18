import type { MeetingEvent } from './meeting-event'

export abstract class MeetingEventsBus {
  abstract notify(event: MeetingEvent): void
}
