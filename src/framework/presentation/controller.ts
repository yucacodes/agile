import { type UseCase } from '@framework/application'
import { type Constructor } from '../generics'
import { type EventController } from './event-controller'
import type { HttpController } from './http-controller'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'

export type InlineEventControllerConfig = {
  event: string
  useCase: Constructor<UseCase<any, any>>
}

export type InlineHttpControllerConfig = {
  method: HttpMethod
  path: string
  useCase: Constructor<UseCase<any, any>>
}

export type ControllerConfig =
  | Constructor<EventController<unknown, unknown>>
  | Constructor<HttpController>
  | InlineEventControllerConfig
  | InlineHttpControllerConfig
