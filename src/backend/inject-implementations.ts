import { MeetingsRepository } from '@domain'
import { TimeProvider } from '@framework/domain'
import { ServerTimeProvider } from '@framework/infrastructure'
import { container } from '@framework/injection'
import {
  MeetingsDummyRepository
} from '@infrastructure'

// Servers
// const httpServer = createServer()
// container.register('HttpServer', { useValue: httpServer })

// const socketIoServer = new SocketIoServer(httpServer as any)
// container.register('SocketIoServer', { useValue: socketIoServer })

// TimeManager
container.registerType(TimeProvider as any, ServerTimeProvider)

// Repositories
// container.registerType(MeetingsRepository as any, MeetingsRedisRepository)
container.registerType(MeetingsRepository as any, MeetingsDummyRepository)
