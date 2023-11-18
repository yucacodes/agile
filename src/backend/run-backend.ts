const { container } = await import('./inject-dependencies')
const { MeetingSocketsHandler } = await import('@presentation')

import {
  type ApiEmmitedEventsMap,
  type ApiListenEventsMap,
  type ApiServerEventsMap,
  type ApiSocketData,
} from '@presentation'
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server<
  ApiListenEventsMap,
  ApiEmmitedEventsMap,
  ApiServerEventsMap,
  ApiSocketData
>(httpServer as any)

const meetingSocketsHandler = container.resolve(MeetingSocketsHandler)

io.on('connection', (socket) =>
  meetingSocketsHandler.handleSocketConnection(socket)
)

httpServer.listen(3000)
