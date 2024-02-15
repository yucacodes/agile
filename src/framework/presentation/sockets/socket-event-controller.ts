import { Authorization } from '@framework/application'
import type { Socket } from 'socket.io'
import { container } from 'tsyringe'
import type { AuthProvider } from '../auth-provider'
import type { InlineEventControllerConfig } from '../controller'
import type { Logger } from '../logger'
import { type SocketCallback } from './sockets-types'

export interface SocketEventControllerConfig {
  socketEvent: string
  logger: Logger
  authProvider: AuthProvider<any>
}

export abstract class SocketEventController {
  eventsCount = 0

  constructor(protected config: SocketEventControllerConfig) {}

  protected getAuthInfo(socket: Socket) {
    const { authProvider } = this.config
    // TODO: Validate
    return (authProvider.getWsAuth && authProvider.getWsAuth(socket)) ?? null
  }

  protected setAuthInfo(socket: Socket, auth: any) {
    const { authProvider } = this.config
    // TODO: Validate
    return authProvider.setWsAuth && authProvider.setWsAuth(socket, auth)
  }

  public listenFor(socket: Socket) {
    const { socketEvent, logger } = this.config
    const listener = async (
      input: any,
      callback: SocketCallback<any> | undefined
    ) => {
      this.eventsCount++
      const eventId = this.eventsCount
      try {
        logger.info(`(${eventId}) Start event`)
        const data = await this.handleEvent(socket, input)
        logger.info(`(${eventId}) Success request`)
        return callback && callback({ success: true, data })
      } catch (error) {
        logger.error(`(${eventId}) Request Error`, error as Error)
        return callback && callback({ success: false })
      }
    }
    return [socketEvent as any, listener] as const
  }

  protected abstract handleEvent(socket: Socket, input: any): Promise<any>
}

export class SocketEventControllerForUseCase extends SocketEventController {
  constructor(
    logger: Logger,
    authProvider: AuthProvider<any>,
    private inlineConfig: InlineEventControllerConfig
  ) {
    super({
      authProvider,
      logger,
      socketEvent: inlineConfig.event,
    })
  }

  protected async handleEvent(socket: Socket, input: any): Promise<any> {
    const requestContainer = container.createChildContainer()
    requestContainer.register(Authorization, {
      useValue: new Authorization(
        () => {
          return this.getAuthInfo(socket)
        },
        (auth) => {
          this.setAuthInfo(socket, auth)
        }
      ),
    })

    const useCase = requestContainer.resolve(this.inlineConfig.useCase)
    await useCase.perform(input)
  }
}