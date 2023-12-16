import { MeetingEventsBus, MeetingsRepository } from '@domain'
import { TimeManager } from '@framework/domain'
import { ServerTimeManager } from '@framework/infrastructure'
import { container } from '@framework/injection'
import {
  MeetingSocketsEventsBus,
  MeetingsDummyRepository,
} from '@infrastructure'
import { createServer } from 'http'
import { Server as SocketIoServer } from 'socket.io'

// Servers
const httpServer = createServer()
container.register('HttpServer', { useValue: httpServer })

const socketIoServer = new SocketIoServer(httpServer as any)
container.register('SocketIoServer', { useValue: socketIoServer })

// TimeManager
container.registerType(TimeManager as any, ServerTimeManager)

// Repositories
container.registerType(MeetingsRepository as any, MeetingsDummyRepository)

// Events Buses
container.registerType(MeetingEventsBus as any, MeetingSocketsEventsBus)
