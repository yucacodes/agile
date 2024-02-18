import type { Socket } from 'socket.io'
import { Authorization } from '../../application'

import { container, type DependencyContainer } from '../../injection'
import { Logger } from '../../logger'
import type { AuthProvider } from '../auth-provider'
import type { InlineEventControllerConfig } from '../controller'
import { type SocketCallback } from './sockets-types'

export interface SocketEventControllerConfig {
  socketEvent: string
  authProvider?: AuthProvider<any>
}

export abstract class SocketEventController {
  eventsCount = 0
  logger: Logger

  constructor(protected config: SocketEventControllerConfig) {
    this.logger = new Logger(`${config.socketEvent}:EventController`)
  }

  protected getAuthInfo(socket: Socket) {
    const { authProvider } = this.config
    return (
      (authProvider &&
        authProvider.getSocketAuth &&
        authProvider.getSocketAuth(socket)) ??
      null
    )
  }

  protected getAuthRoles(socket: Socket) {
    const { authProvider } = this.config
    return (
      (authProvider &&
        authProvider.authRoles &&
        authProvider.getSocketAuth &&
        authProvider.authRoles(authProvider.getSocketAuth(socket))) ??
      null
    )
  }

  protected setAuthInfo(socket: Socket, auth: unknown) {
    const { authProvider } = this.config

    authProvider &&
      authProvider.setSocketAuth &&
      authProvider.setSocketAuth(socket, auth)
  }

  public listenFor(socket: Socket) {
    const { socketEvent } = this.config
    const listener = async (
      input: any,
      callback: SocketCallback<any> | undefined
    ) => {
      this.eventsCount++
      const eventId = this.eventsCount
      try {
        this.logger.info(`(${eventId}) received`)
        const requestContainer = container.createChildContainer()
        requestContainer.register(Authorization, {
          useValue: new Authorization(
            this.getAuthInfo(socket),
            this.getAuthRoles(socket),
            (auth) => {
              this.setAuthInfo(socket, auth)
            }
          ),
        })
        const data = await this.handleRequest(requestContainer, input)
        this.logger.info(`(${eventId}) success`)
        return callback && callback({ success: true, data })
      } catch (error) {
        this.logger.error(`(${eventId}) error`, error as Error)
        return callback && callback({ success: false })
      }
    }
    return [socketEvent as any, listener] as const
  }

  protected abstract handleRequest(
    container: DependencyContainer,
    request: any
  ): Promise<any>
}

export class SocketEventControllerForUseCase extends SocketEventController {
  constructor(
    private inlineConfig: InlineEventControllerConfig,
    authProvider: AuthProvider<any> | null
  ) {
    super({
      authProvider: authProvider ?? undefined,
      socketEvent: inlineConfig.event,
    })
  }

  protected async handleRequest(
    container: DependencyContainer,
    input: any
  ): Promise<any> {
    container.afterResolution(this.inlineConfig.useCase, (_, uc) => {
      // eslint-disable-next-line no-extra-semi
      ;([uc].flat()[0] as any).__container__ = container
    })
    const useCase = container.resolve(this.inlineConfig.useCase)
    await useCase.perform(input)
  }
}
