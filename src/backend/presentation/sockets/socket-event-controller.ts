import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { type AuthInformationDto } from '@application'
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
  private config(): SocketEventControllerConfig {
    throw new Error(
      `Should configure ${this.constructor.name} using @socketEventController(config) decorator`
    )
  }

  socketEvent() {
    const { socketEvent } = this.config()
    return socketEvent
  }

  public listenFor(socket: GenericSocket) {
    const { socketEvent, requestValidator, logger } = this.config()
    const listener = async (
      request: Request,
      callback: SocketCallback<Result>
    ) => {
      const requestErrors = await validate(
        plainToInstance(requestValidator, request)
      )
      if (requestErrors.length > 0) {
        logger.error('Bad Request', requestErrors)
        return callback({ success: false })
      }

      try {
        const data = await this.handle(request, socket.data.auth)
        logger.info('Success request')
        this.onSuccess(socket, data)
        return callback({ success: true, data })
      } catch (error) {
        logger.error('Request Error', error as Error)
        return callback({ success: false })
      }
    }
    return [socketEvent as any, listener] as const
  }

  protected abstract handle(
    request: Request,
    authData?: AuthInformationDto
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
