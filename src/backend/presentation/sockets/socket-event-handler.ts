import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { type UseCase, type UseCaseWithoutAuth } from '@application'
import { type MeetingSocket } from '../meeting-sockets/meeting-sockets-types'
import { type SocketCallback } from './sockets-types'

interface RequestValidator<Request> {
  new (): Request & object
}

export interface SocketEventHandlerFactoryProps<Request, Result> {
  requestValidator: RequestValidator<Request>
  useCase: UseCase<Request, Result>
}

export class SocketEventHandler<Request, Result> {
  static facory<Request, Result>(
    props: SocketEventHandlerFactoryProps<Request, Result>
  ): SocketEventHandler<Request, Result> {
    return new SocketEventHandler(props.requestValidator, props.useCase)
  }

  constructor(
    private requestValidator: RequestValidator<Request>,
    private useCase: UseCase<Request, Result>
  ) {}

  async handle(
    socket: MeetingSocket,
    request: Request,
    callback: SocketCallback<Result>
  ) {
    const requestErrors = await validate(
      plainToInstance(this.requestValidator, request)
    )
    if (requestErrors.length > 0) return callback({ success: false })
    try {
      if (this.useCase.perform.length === 1) {
        const data = await (
          this.useCase as UseCaseWithoutAuth<Request, Result>
        ).perform(request)
        return callback({ success: true, data })
      } else if (this.useCase.perform.length === 2) {
        if (!socket.data.auth) return callback({ success: false })
        const data = await this.useCase.perform(request, socket.data.auth)
        return callback({ success: true, data })
      }
    } catch {
      return callback({ success: false })
    }
  }
}
