import type {
  AuthRequestDto,
  MeetingParticipantJoinedEventDto,
  MeetingWithAuthInformationDto,
  UserCreateMeetingRequestDto,
} from '@application'
import type { Socket } from 'socket.io'

export type OnStartMeetingCallback = (
  data: MeetingWithAuthInformationDto
) => void

export type ApiListenEventsMap = {
  StartMeeting: (
    request: UserCreateMeetingRequestDto,
    callback: OnStartMeetingCallback
  ) => void
}

export type ApiEmmitedEventsMap = {
  ParticipantJoined: (data: MeetingParticipantJoinedEventDto) => void
}

export type ApiServerEventsMap = {}

export type ApiListenEvent = keyof ApiListenEventsMap
export type ApiEmmitedEvent = keyof ApiEmmitedEventsMap
export type ApiServerEvent = keyof ApiServerEventsMap

export type ApiSocketData = {
  auth?: AuthRequestDto
}

export type ApiSocket = Socket<
  ApiListenEventsMap,
  ApiEmmitedEventsMap,
  ApiServerEventsMap,
  ApiSocketData
>
