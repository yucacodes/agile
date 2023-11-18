await import('reflect-metadata')
const { container: c } = await import('tsyringe')
const { MeetingsRepository, MeetingEventsBus } = await import('@domain')
const { MeetingEventsSocketsBroadcaster } = await import('@presentation')
const { MeetingsDummyRepository } = await import('@infrastructure')

c.registerType(MeetingsRepository as any, MeetingsDummyRepository)
c.registerType(MeetingEventsBus as any, MeetingEventsSocketsBroadcaster)

export const container = c
