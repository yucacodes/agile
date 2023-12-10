import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { type UseCase } from '@application'

import { type GenericSocket, type SocketCallback } from './sockets-types'
import { Logger } from '../logger'

interface RequestValidator<Request> {
  new (): Request & object
}

export interface SocketEventHandlerFactoryProps<Request, Result> {
  requestValidator: RequestValidator<Request>
  useCase: UseCase<Request, Result>
}

export interface HandleWithUseCaseArgs<Request, Result> {
  socket: GenericSocket
  request: Request
  callback: SocketCallback<Result>
  useCase: UseCase<Request, Result>
  requestValidator: RequestValidator<Request>
}

export abstract class SocketEventHandler<Request, Result> {
  constructor(private logger: Logger) {}

  public for(socket: GenericSocket) {
    return (request: Request, callback: SocketCallback<Result>) => {
      this.handle(socket, request, (result) => {
        if (result.success) this.onSuccess(socket, result.data)
        callback(result)
      })
    }
  }

  protected abstract handle(
    socket: GenericSocket,
    request: Request,
    callback: SocketCallback<Result>
  ): Promise<void>

  protected async handleWithUseCase({
    socket,
    request,
    callback,
    requestValidator,
    useCase,
  }: HandleWithUseCaseArgs<Request, Result>) {
    const requestErrors = await validate(
      plainToInstance(requestValidator, request)
    )
    if (requestErrors.length > 0) {
      this.logger.error('Bad Request', requestErrors)
      return callback({ success: false })
    }
    try {
      const data = await useCase.perform(request, socket.data.auth)
      this.logger.info('Use Case Success')
      return callback({ success: true, data })
    } catch (error) {
      this.logger.error('Use Case Error', error as Error)
      return callback({ success: false })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSuccess(socket: GenericSocket, result: Result): void {}
}
