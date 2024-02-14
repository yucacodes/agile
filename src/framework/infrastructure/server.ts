import { type UseCase } from '@framework/application'
import { type Mapper } from '@framework/application/mapper'
import { type Constructor } from '@framework/generics'
import {
  type Controller,
  type HttpMethod,
} from '@framework/presentation/controller'

export abstract class Server {}

export type InlineWsControllerConfig = {
  event: string
  useCase: Constructor<UseCase<any, any, any>>
}

export type InlineHttpControllerConfig = {
  method: HttpMethod
  path: string
  useCase: Constructor<UseCase<any, any, any>>
}

export type ControllerConfig =
  | Constructor<Controller>
  | InlineWsControllerConfig
  | InlineHttpControllerConfig

export type InlineWsEmitterConfig<M, DTO> = {
  model: Constructor<M>
  event: string
  mapper: Constructor<Mapper<M, DTO>>
}

export type EmitterConfig = InlineWsEmitterConfig<unknown, unknown>

export interface serverConfig {
  controllers?: ControllerConfig[]
  emitters?: EmitterConfig[]
}

export function server(config: serverConfig) {
  return (constructor: Constructor<Server>) => {
    constructor.prototype.__config__ = function __config__() {
      return config
    }
  }
}
