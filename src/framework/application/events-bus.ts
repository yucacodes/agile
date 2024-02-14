export interface EventNotification<E extends Object> {
  event: E
  channel: string
}

export interface Subscription {
  channel: string
}

export class EventsBus {
  notify<E extends Object>(event: EventNotification<E>): void {}

  subscribe(subscription: Subscription): void {}
}
