import { type MeetingParticipantJoinedEventDto } from '@application'
import { type SocketEmit } from '../sockets'

// ----- Events that server emit, and client listen -----
export type MeetingEmmitedEventsMap = {
  ParticipantJoined: SocketEmit<MeetingParticipantJoinedEventDto>
}

export type MeetingEmmitedEvent = keyof MeetingEmmitedEventsMap
