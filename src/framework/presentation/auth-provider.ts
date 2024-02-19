import { type Socket } from 'socket.io'
import type { Request, Response } from 'express'

export type SocketAuthProvider<Auth> = {
  getAuth?(socket: Socket): Auth | null
  setAuth?(socket: Socket, auth: Auth): void
}

// export type AuthProvider<Auth> = {
//   getHttpAuth?(req: Request): Auth | null
//   setHttpAuth?(res: Response, auth: Auth): void
//   authRoles?(auth: Auth): string[]
// }
