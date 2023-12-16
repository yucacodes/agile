import { container } from '@injection'
import { Environment, Logger } from '@presentation'
import { createServer } from 'http'
import { Server as SocketIoServer } from 'socket.io'
import { MeetingSocketsEventsListener } from './infrastructure/meeting-sockets-events-listener'
import './inject-implementations'

const httpServer = createServer()
const socketIoServer = new SocketIoServer(httpServer as any)
const environment = container.resolve(Environment)
const meetingSocketsListener = container.resolve(MeetingSocketsEventsListener)
const logger = new Logger('Server')

// Implement logging
socketIoServer.use((socket, next) => {
  logger.info(`Socket connection: ${socket.conn.remoteAddress}`)
  socket.onAny((event) => {
    logger.info(`Socket ${socket.conn.remoteAddress}: ${event}`)
  })
  next()
})

// Handle connections
socketIoServer.on('connection', (socket) => {
  meetingSocketsListener.addToSocket(socket)
})

// Run Server
const port = environment.getEnvironmentVariableAsNumber('PORT', 3000)
httpServer.listen(port, () => {
  logger.info(`Running on port ${port}`)
})
