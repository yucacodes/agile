
await import('reflect-metadata')
const { container: c } = await import('tsyringe')
const { MeetingsRepository, MeetingEventsBus, TimeManager } = await import('@domain')
const {
  MeetingsDummyRepository,
  MeetingSocketsEventsBus,
  ServerTimeManager,
  httpServer,
  meetingSocketsServer,
} = await import('@infrastructure')

const { default: pino } = await import('pino')
const logger = pino()

// TimeManager
c.registerType(TimeManager as any, ServerTimeManager)

// Repositories
c.registerType(MeetingsRepository as any, MeetingsDummyRepository)

// Events Buses
c.registerType(MeetingEventsBus as any, MeetingSocketsEventsBus)

// Servers
c.register('HttpServer', { useValue: httpServer })
c.register('MeetingSocketsServer', { useValue: meetingSocketsServer })

// Loggers
c.register('Logger', { useValue: logger })

export const container = c
