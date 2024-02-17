import { type Socket } from 'socket.io'
import type { Request, Response } from 'express'

export type AuthProvider<Auth> = {
  getSocketAuth?(socket: Socket): Auth | null
  setSocketAuth?(socket: Socket, auth: Auth): void
  getHttpAuth?(req: Request): Auth | null
  setHttpAuth?(res: Response, auth: Auth): void
  authRoles?(auth: Auth): string[]
}
