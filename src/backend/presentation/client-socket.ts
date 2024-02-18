import type { Socket as ClientSocket } from 'socket.io-client'
import type { EmmitedEventsMap } from './emited-events'
import type { ListenEventsMap } from './listen-events'

export type MeetingClientSocket = ClientSocket<
  EmmitedEventsMap,
  ListenEventsMap
>
