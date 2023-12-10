const { container } = await import('./inject-dependencies')
const { MeetingSocketsHandler, Environment, Logger } = await import(
  '@presentation'
)

import { type MeetingSocketsServer } from '@presentation'
import { type Server as HttpServer } from 'http'

const environment = container.resolve(Environment)
const httpServer = container.resolve<HttpServer>('HttpServer')
const logger = new Logger('Server')

const meetingSocketsServer = container.resolve<MeetingSocketsServer>(
  'MeetingSocketsServer'
)

// Implement logging
meetingSocketsServer.use((socket, next) => {
  logger.info(`Socket connection: ${socket.conn.remoteAddress}`)
  socket.onAny((event) => {
    logger.info(`Socket ${socket.conn.remoteAddress}: ${event}`)
  })
  next()
})

// Handle connections
const meetingSocketsHandler = container.resolve(MeetingSocketsHandler)
meetingSocketsServer.on('connection', (socket) => {
  meetingSocketsHandler.handleSocketConnection(socket)
})

// Run Server
const port = environment.getEnvironmentVariableAsNumber('PORT', 3000)
httpServer.listen(port, () => {
  logger.info(`Running on port ${port}`)
})
