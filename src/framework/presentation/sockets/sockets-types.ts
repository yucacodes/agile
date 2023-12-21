import { type AuthInformationDto } from '@framework/application'
import type { Socket } from 'socket.io'
import type { EventsMap } from 'socket.io/dist/typed-events'

export type SocketErrorResult = { success: false; errorCode?: string }

export type SocketSuccessResult<R> = { success: true; data: R }

export type SocketResult<R> = SocketSuccessResult<R> | SocketErrorResult

export type SocketCallback<R> = (result: SocketResult<R>) => void

export type SocketListener<Request, Result> = (
  request: Request,
  callback: SocketCallback<Result>
) => void

export type SocketEmit<Data> = (data: Data) => void

export type SocketData = { auth?: AuthInformationDto }

export type GenericSocket = Socket<EventsMap, EventsMap, EventsMap, SocketData>
