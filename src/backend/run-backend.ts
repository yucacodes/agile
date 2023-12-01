const { container } = await import('./inject-dependencies')
const { MeetingSocketsHandler } = await import('@presentation')

import {
  type MeetingEmmitedEventsMap,
  type MeetingListenEventsMap,
  type MeetingServerEventsMap,
  type MeetingSocketData,
} from '@presentation'
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server<
  MeetingListenEventsMap,
  MeetingEmmitedEventsMap,
  MeetingServerEventsMap,
  MeetingSocketData
>(httpServer as any)

const meetingSocketsHandler = container.resolve(MeetingSocketsHandler)

io.on('connection', (socket) =>
  meetingSocketsHandler.handleSocketConnection(socket)
)

httpServer.listen(3000)
