import { singleton } from 'tsyringe'
import { type Constructor } from '../../generics'

export type UseCase<Req, Res, Auth> = {
  perform(request: Req, auth: Auth | null): Res
}

export interface useCaseConfig {
  roles?: string[]
  noLogin?: boolean
}

export function useCase(config: useCaseConfig) {
  return <Req, Res, Auth>(
    constructor: Constructor<UseCase<Req, Res, Auth>>
  ) => {
    constructor.prototype.__config__ = function __config__() {
      return config
    }
    singleton()(constructor)
  }
}
