export type SocketErrorResult = { success: false; errorCode?: string }

export type SocketSuccessResult<R> = { success: true; data: R }

export type SocketResult<R> = SocketSuccessResult<R> | SocketErrorResult

export type SocketCallback<R> = (result: SocketResult<R>) => void

export type SocketListener<Request, Result> = (
  request: Request,
  callback: SocketCallback<Result>
) => void

export type SocketEmit<Data> = (data: Data) => void
