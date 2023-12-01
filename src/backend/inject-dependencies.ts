await import('reflect-metadata')
const { container: c } = await import('tsyringe')
const { MeetingsRepository, MeetingEventsBus } = await import('@domain')
const {
  MeetingsDummyRepository,
  MeetingSocketsEventsBus,
  httpServer,
  meetingSocketsServer,
} = await import('@infrastructure')

// Repositories
c.registerType(MeetingsRepository as any, MeetingsDummyRepository)

// Events Buses
c.registerType(MeetingEventsBus as any, MeetingSocketsEventsBus)

// Servers
c.register('HttpServer', { useValue: httpServer })
c.register('MeetingSocketsServer', { useValue: meetingSocketsServer })

export const container = c
