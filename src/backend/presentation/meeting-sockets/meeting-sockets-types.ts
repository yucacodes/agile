import type {
  AuthInformationDto,
  MeetingParticipantJoinedEventDto,
  MeetingWithAuthInformationDto,
  UserCreateMeetingRequestDto,
  UserJoinMeetingRequestDto,
  UserDisconnectedFromMeetingDto,
} from '@application'
import type { Server, Socket } from 'socket.io'
import { type SocketEmit, type SocketListener } from '../sockets/sockets-types'
import type { Socket as ClientSocket } from 'socket.io-client'

export type MeetingListenEventsMap = {
  StartMeeting: SocketListener<
    UserCreateMeetingRequestDto,
    MeetingWithAuthInformationDto
  >
  JoinMeeting: SocketListener<
    UserJoinMeetingRequestDto,
    MeetingWithAuthInformationDto
  >
  UserDisconnectedFromMeeting: SocketListener<
    UserDisconnectedFromMeetingDto,
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

export type MeetingClientSocket = ClientSocket<
  MeetingEmmitedEventsMap,
  MeetingListenEventsMap
>

export type MeetingSocketsServer = Server<
  MeetingListenEventsMap,
  MeetingEmmitedEventsMap,
  MeetingServerEventsMap,
  MeetingSocketData
>
