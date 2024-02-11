import type { Socket as ClientSocket } from 'socket.io-client'
import { type MeetingEmmitedEventsMap } from './meeting-emmited-events'
import { type MeetingListenEventsMap } from './meeting-listen-events'

export type MeetingClientSocket = ClientSocket<
  MeetingEmmitedEventsMap,
  MeetingListenEventsMap
>
