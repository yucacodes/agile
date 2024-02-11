import { MeetingSocketsEventsListener } from '@infrastructure'
import { container } from '@framework/injection'
import { Environment, Logger } from '@framework/presentation'
import { type Server as HttpServer } from 'http'
import { type Server as SocketIoServer } from 'socket.io'
import './inject-implementations'

const httpServer = container.resolve<HttpServer>('HttpServer')
const socketIoServer = container.resolve<SocketIoServer>('SocketIoServer')
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
