import { MeetingEventsBus, MeetingsRepository, TimeManager } from '@domain'
import { container } from '@injection'
import {
  MeetingSocketsEventsBus,
  MeetingsDummyRepository,
  ServerTimeManager,
} from '@infrastructure'
import { createServer } from 'http'
import { Server as SocketIoServer } from 'socket.io'

// TimeManager
container.registerType(TimeManager as any, ServerTimeManager)

// Repositories
container.registerType(MeetingsRepository as any, MeetingsDummyRepository)

// Events Buses
container.registerType(MeetingEventsBus as any, MeetingSocketsEventsBus)

// Servers
const httpServer = createServer()
container.register('HttpServer', { useValue: httpServer })

const socketIoServer = new SocketIoServer(httpServer as any)
container.register('SocketIoServer', { useValue: socketIoServer })
