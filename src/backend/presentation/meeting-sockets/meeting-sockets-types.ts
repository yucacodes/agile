import type {
  AuthInformationDto,
  MeetingParticipantJoinedEventDto,
  MeetingWithAuthInformationDto,
  UserCreateMeetingRequestDto,
} from '@application'
import type { Server, Socket } from 'socket.io'
import { type SocketEmit, type SocketListener } from '../sockets/sockets-types'

export type MeetingListenEventsMap = {
  StartMeeting: SocketListener<
    UserCreateMeetingRequestDto,
    MeetingWithAuthInformationDto
  >
}
export type MeetingListenEvent = keyof MeetingListenEventsMap

export type MeetingEmmitedEventsMap = {
  ParticipantJoined: SocketEmit<MeetingParticipantJoinedEventDto>
}
export type MeetingEmmitedEvent = keyof MeetingEmmitedEventsMap

export type MeetingServerEventsMap = {}
export type MeetingServerEvent = keyof MeetingServerEventsMap

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

export type MeetingSocketsServer = Server<
  MeetingListenEventsMap,
  MeetingEmmitedEventsMap,
  MeetingServerEventsMap,
  MeetingSocketData
>
