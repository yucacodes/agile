import { type AuthInformationDto } from '@framework/application'
import { type Socket } from 'socket.io'
import { type MeetingEmmitedEventsMap } from './meeting-emmited-events'
import { type MeetingListenEventsMap } from './meeting-listen-events'
import { type MeetingServerEventsMap } from './meeting-server-events'

export type MeetingSocketData = {
  auth?: AuthInformationDto
  meetingId?: string
}

export type MeetingSocket = Socket<
  MeetingListenEventsMap,
  MeetingEmmitedEventsMap,
  MeetingServerEventsMap,
  MeetingSocketData
>
