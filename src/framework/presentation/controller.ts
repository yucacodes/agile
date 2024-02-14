import { type UseCase } from '@framework/application'
import { type Constructor } from '../generics'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'

export type InlineWsControllerConfig = {
  event: string
  useCase: Constructor<UseCase<any, any>>
}

export type InlineHttpControllerConfig = {
  method: HttpMethod
  path: string
  useCase: Constructor<UseCase<any, any>>
}

export type ControllerConfig =
  | Constructor<Controller>
  | InlineWsControllerConfig
  | InlineHttpControllerConfig

export class Controller {
  static forConfig(): Controller {}

  
}
