import { singleton } from 'tsyringe'
import { type Constructor } from '../generics'

export type UseCase<Req, Res> = {
  perform(request: Req): Res
}

export type useCaseConfigForSingleRole<Req> = {
  allowRole: string | ((req: Req) => string)
  requestValidator?: Constructor<Req>
}

export type useCaseConfigForMultipleRoles<Req> = {
  allowRoles: string[] | ((req: Req) => string[])
  requestValidator?: Constructor<Req>
}

export type useCaseConfigForNoAuthorization<Req> = {
  allowNoAuth: boolean
  requestValidator?: Constructor<Req>
}

export type useCaseConfig<Req> =
  | useCaseConfigForSingleRole<Req>
  | useCaseConfigForMultipleRoles<Req>
  | useCaseConfigForNoAuthorization<Req>

export function useCase<Req>(config: useCaseConfig<Req>) {
  return <Res>(constructor: Constructor<UseCase<Req, Res>>) => {
    constructor.prototype.__config__ = function __config__() {
      return config
    }
    singleton()(constructor)
  }
}
