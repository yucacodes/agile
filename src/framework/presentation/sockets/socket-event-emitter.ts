// import { type Server as SocketIoServer } from 'socket.io'
// import { Logger } from '../../logger'


// export type DomainEventClass<DomainEvent> = {
//   new (...args: any): DomainEvent
// }

// export interface SocketEventEmmiterConfig {
//   socketEvent: string
//   domainEventClass: DomainEventClass<any>
//   logger: Logger
// }

// export type SocketEventEmitterClass = {
//   new (...args: any): SocketEventEmitter<any, any>
// }

// export abstract class SocketEventEmitter<DomainEvent, Output> {
//   private config(): SocketEventEmmiterConfig {
//     throw new Error(
//       `$Should configure ${this.constructor.name} using @socketEventEmitter(config) decorator`
//     )
//   }

//   socketEvent() {
//     const { socketEvent } = this.config()
//     return socketEvent
//   }

//   async emitIfMatch(domainEvent: any, socketIoServer: SocketIoServer) {
//     const {
//       socketEvent,
//       domainEventClass: domainEventClass,
//       logger,
//     } = this.config()
//     if (!(domainEvent instanceof domainEventClass)) return
//     const { roomId, data } = this.emit(domainEvent)
//     socketIoServer.to(roomId).emit(socketEvent, data)
//     logger.info('Success emission')
//   }

//   protected abstract emit(domainEvent: DomainEvent): EmittedResult<Output>
// }

// export interface socketEventEmitterProps<DomainEvent> {
//   socketEvent: string
//   domainEvent: DomainEventClass<DomainEvent>
// }

// export function socketEventEmitter<DomainEvent>(
//   props: socketEventEmitterProps<DomainEvent>
// ) {
//   return (constructor: SocketEventEmitterClass) => {
//     const _config: SocketEventEmmiterConfig = {
//       socketEvent: props.socketEvent,
//       domainEventClass: props.domainEvent,
//       logger: new Logger(`${props.socketEvent}EventEmitter`),
//     }
//     constructor.prototype.config = function config() {
//       return _config
//     }
//   }
// }
