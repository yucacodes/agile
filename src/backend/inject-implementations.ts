import { MeetingEventsBus, MeetingsRepository } from '@domain'
import { TimeProvider } from '@framework/domain'
import { ServerTimeManager } from '@framework/infrastructure'
import { container } from '@framework/injection'
import {
  MeetingSocketsEventsBus,
  MeetingsRedisRepository,
} from '@infrastructure'
import { createServer } from 'http'
import { Server as SocketIoServer } from 'socket.io'

// Servers
const httpServer = createServer()
container.register('HttpServer', { useValue: httpServer })

const socketIoServer = new SocketIoServer(httpServer as any)
container.register('SocketIoServer', { useValue: socketIoServer })

// TimeManager
container.registerType(TimeProvider as any, ServerTimeManager)

// Repositories
container.registerType(MeetingsRepository as any, MeetingsRedisRepository)

// Events Buses
container.registerType(MeetingEventsBus as any, MeetingSocketsEventsBus)
