import { Server as SocketsServer } from 'socket.io'
import type { MeetingSocketsServer } from '@presentation'
import { httpServer } from './http-server'

export const meetingSocketsServer: MeetingSocketsServer = new SocketsServer(
  httpServer as any
)
