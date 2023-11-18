await import('./inject-dependencies')
const { onStartMeetingHandler } = await import('@presentation')

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
>(httpServer)

io.on('connection', (socket) => {
  socket.on('StartMeeting', onStartMeetingHandler)
})

httpServer.listen(3000)
