import { type Constructor } from '@framework/generics'
import { type Mapper } from '@framework/mapper'
import { type ControllerConfig } from '@framework/presentation/controller'

export abstract class Server {}

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
