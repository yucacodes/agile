import type { Application } from 'express'
import { default as express } from 'express'
import { createServer, type Server as HttpServer } from 'http'
import { Server as SocketsServer } from 'socket.io'
import { type Constructor } from '../generics'
import { container } from '../injection'
import { Logger } from '../logger'
import type {
  AuthProvider,
  EventController,
  InlineEventControllerConfig,
  SocketEventController,
} from '../presentation'
import {
  SocketEventControllerForUseCase,
  type ControllerConfig,
  type EmitterConfig,
} from '../presentation'

export interface ServerRunConfig {
  port: number
}

export abstract class Server {
  private expressApp: Application
  private httpServer: HttpServer
  private socketsServer: SocketsServer | undefined
  private eventsControllers: SocketEventController[] | undefined
  private logger = new Logger('Server')

  constructor() {
    this.expressApp = express()
    this.httpServer = createServer(this.expressApp)

    this.eventsControllers = this.buildEventsControllers()
    if (this.eventsControllers?.length) {
      this.addEventsListeners()
    }
  }

  run(runConfig: ServerRunConfig) {
    this.httpServer.listen(runConfig.port, () => {
      this.logger.info(`Running on port ${runConfig.port}`)
    })
  }

  private __config__(): serverConfig {
    throw `Should config the server using @server decorator`
  }

  private addEventsListeners() {
    this.socketsServer = new SocketsServer()
    this.socketsServer.listen(this.httpServer)
    this.socketsServer.use((socket, next) => {
      this.logger.info(`Socket connection: ${socket.conn.remoteAddress}`)
      socket.onAny((event) => {
        this.logger.info(`Socket ${socket.conn.remoteAddress}: ${event}`)
      })
      next()
    })
    this.socketsServer.on('connection', (socket) => {
      this.eventsControllers &&
        this.eventsControllers.forEach((x) => socket.on(...x.listenFor(socket)))
    })
  }

  private buildEventsControllers(): SocketEventController[] | undefined {
    const config = this.__config__()
    const authProvider = config.authProvider
      ? container.resolve(config.authProvider)
      : null

    return config.controllers?.map((x) => {
      const inlineConfig = this.inlineEventControllerConfig(x)
      if (inlineConfig) {
        return new SocketEventControllerForUseCase(inlineConfig, authProvider)
      }
      throw new Error(`Controller configuration not supported`)
    })
  }

  private inlineEventControllerConfig(
    controllerConfig: ControllerConfig
  ): InlineEventControllerConfig | undefined {
    if (typeof controllerConfig !== 'object') return undefined
    if (!(controllerConfig as InlineEventControllerConfig).event)
      return undefined
    return controllerConfig as InlineEventControllerConfig
  }

  private classEventControllerConfig(
    controllerConfig: ControllerConfig
  ): Constructor<EventController<unknown, unknown>> | undefined {
    if (typeof controllerConfig !== 'function') return undefined
  }
}

export interface serverConfig {
  controllers?: ControllerConfig[]
  emitters?: EmitterConfig[]
  authProvider?: Constructor<AuthProvider<unknown>>
}

export function server(config: serverConfig) {
  return (constructor: Constructor<Server>) => {
    constructor.prototype.__config__ = function __config__() {
      return config
    }
  }
}
