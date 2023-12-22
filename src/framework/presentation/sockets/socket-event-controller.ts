import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { type AuthInformationDto } from '@framework/application'
import { Logger } from '../logger'
import { type GenericSocket, type SocketCallback } from './sockets-types'

interface RequestValidator<Request> {
  new (): Request & object
}

export interface SocketEventControllerConfig {
  socketEvent: string
  requestValidator: RequestValidator<any>
  logger: Logger
}

export type SocketEventControllerClass = {
  new (...args: any): SocketEventController<any, any>
}

export abstract class SocketEventController<Request, Result> {
  eventsCount = 0

  private config(): SocketEventControllerConfig {
    throw new Error(
      `Should configure ${this.constructor.name} using @socketEventController(config) decorator`
    )
  }

  socketEvent() {
    const { socketEvent } = this.config()
    return socketEvent
  }

  protected request(socket: GenericSocket, input: any): Request {
    return input
  }

  protected authData(
    socket: GenericSocket,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: any
  ): AuthInformationDto | undefined {
    return socket.data.auth
  }

  public listenFor(socket: GenericSocket) {
    const { socketEvent, requestValidator, logger } = this.config()
    const listener = async (
      input: any,
      callback: SocketCallback<Result> | undefined
    ) => {
      this.eventsCount++
      const eventId = this.eventsCount
      try {
        logger.info(`(${eventId}) Start event`)
        const request = this.request(socket, input)
        const auth = this.authData(socket, input)
        const validableRequest = plainToInstance(requestValidator, request)
        const requestErrors = await validate(validableRequest)

        if (requestErrors.length > 0) {
          logger.error(`(${eventId}) Bad Request`, requestErrors)
          return callback && callback({ success: false })
        }

        const data = await this.handle(request, auth ?? null)
        logger.info(`(${eventId}) Success request`)
        this.onSuccess(socket, data)
        return callback && callback({ success: true, data })
      } catch (error) {
        logger.error(`(${eventId}) Request Error`, error as Error)
        return callback && callback({ success: false })
      }
    }
    return [socketEvent as any, listener] as const
  }

  protected abstract handle(
    request: Request,
    authData: AuthInformationDto | null
  ): Promise<Result>

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSuccess(socket: GenericSocket, result: Result): void {}
}

export interface socketEventControllerProps {
  socketEvent: string
  requestValidator: RequestValidator<any>
}

export function socketEventController(props: socketEventControllerProps) {
  return (constructor: SocketEventControllerClass) => {
    const _config: SocketEventControllerConfig = {
      socketEvent: props.socketEvent,
      requestValidator: props.requestValidator,
      logger: new Logger(`${props.socketEvent}EventController`),
    }
    constructor.prototype.config = function config() {
      return _config
    }
  }
}
