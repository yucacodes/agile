import { type Socket } from 'socket.io'
import type { Request, Response } from 'express'

export type AuthProvider<Auth> = {
  getWsAuth?(socket: Socket): Auth | null
  setWsAuth?(socket: Socket, auth: Auth): void
  getHttpAuth?(req: Request): Auth | null
  setHttpAuth?(res: Response, auth: Auth): void
  getRoles?(auth: Auth): string[]
}
