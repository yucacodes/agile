import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { type UseCase } from '@application'

import { type GenericSocket, type SocketCallback } from './sockets-types'

interface RequestValidator<Request> {
  new (): Request & object
}

export interface SocketEventHandlerFactoryProps<Request, Result> {
  requestValidator: RequestValidator<Request>
  useCase: UseCase<Request, Result>
}

export abstract class SocketEventHandler<Request, Result> {
  constructor(
    private requestValidator: RequestValidator<Request>,
    private useCase: UseCase<Request, Result>
  ) {}

  public async handle(
    socket: GenericSocket,
    request: Request,
    callback: SocketCallback<Result>
  ) {
    const requestErrors = await validate(
      plainToInstance(this.requestValidator, request)
    )
    if (requestErrors.length > 0) return callback({ success: false })
    try {
      const data = await this.useCase.perform(request, socket.data.auth)
      this.onSuccess(socket, data)
      return callback({ success: true, data })
    } catch (error) {
      return callback({ success: false })
    }
  }

  abstract onSuccess(socket: GenericSocket, result: Result): void
}
