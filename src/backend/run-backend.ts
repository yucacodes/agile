const { container } = await import('./inject-dependencies')
const { MeetingSocketsHandler } = await import('@presentation')

import { type MeetingSocketsServer } from '@presentation'
import { type Server as HttpServer } from 'http'

const httpServer = container.resolve<HttpServer>('HttpServer')

const meetingSocketsServer = container.resolve<MeetingSocketsServer>(
  'MeetingSocketsServer'
)

const meetingSocketsHandler = container.resolve(MeetingSocketsHandler)

meetingSocketsServer.on('connection', (socket) =>
  meetingSocketsHandler.handleSocketConnection(socket)
)

httpServer.listen(3000)
