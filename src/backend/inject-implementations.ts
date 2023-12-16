import { MeetingEventsBus, MeetingsRepository, TimeManager } from '@domain'
import {
  MeetingSocketsEventsBus,
  MeetingsDummyRepository,
  ServerTimeManager,
} from '@infrastructure'
import { container } from '@injection'
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
