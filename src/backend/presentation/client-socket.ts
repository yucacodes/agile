import type { Socket } from 'socket.io-client'
import type { EmmitedEventsMap } from './emited-events'
import type { ListenEventsMap } from './listen-events'

export type ClientSocket = Socket<EmmitedEventsMap, ListenEventsMap>
