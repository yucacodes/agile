import type { Socket, Server as SocketsServer } from 'socket.io'
import type { Notification, Subscription } from '../../application'
import { EventsBus } from '../../application'
import type { Constructor } from '../../generics'
import { container } from '../../injection'
import type { Mapper } from '../../mapper'

export interface SocketEmittedEventHandler {
  event: string
  mapper: Constructor<Mapper<any, any>>
}

export class SocketEventsBus extends EventsBus {
  constructor(
    private handlers: Map<Function, SocketEmittedEventHandler>,
    private socketsServer: SocketsServer,
    private socket: Socket | null
  ) {
    super()
  }

  notify<E extends Object>(notification: Notification<E>): void {
    const handler = this.handlers.get(notification.constructor)
    if (!handler)
      throw new Error(
        `Not found Emmiter for ${notification.constructor.name} event`
      )
    const mapper = container.resolve(handler.mapper)
    const out = mapper.map(notification.event)
    const origin = this.socket ?? this.socketsServer
    origin.in(notification.channel).emit(out)
  }

  subscribe(subscription: Subscription): void {
    if (!this.socket)
      throw `Not way to subscribe to channel out a socket context`
    this.socket.join(subscription.channel)
  }

  unsubscribe(subscription: Subscription): void {
    if (!this.socket)
      throw `Not way to unsubscribe from channel out a socket context`
    this.socket.leave(subscription.channel)
  }
}
