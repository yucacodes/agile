import { singleton } from 'tsyringe'
import { type Constructor } from '../generics'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

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
    const __perform__ = constructor.prototype.perform as Function
    constructor.prototype.perform = async function perform(
      req: Req
    ): Promise<Res> {
      if (config.requestValidator) {
        const validableRequest = plainToInstance(config.requestValidator, req)
        const requestErrors = await validate(validableRequest as any)
        if (requestErrors.length > 0) {
          //TODO: logger.error(`(${eventId}) Bad Request`, requestErrors)
          throw new Error('Bad Request')
        }
      }

      return __perform__.apply(this, [req])
    }

    singleton()(constructor)
  }
}
