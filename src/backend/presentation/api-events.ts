import type {
  AuthRequestDto,
  MeetingParticipantJoinedEventDto,
  MeetingWithAuthInformationDto,
  UserCreateMeetingRequestDto,
} from '@application'
import type { Socket } from 'socket.io'

export type MeetingUseCaseError = { success: false; errorCode?: string }
export type MeetingUseCaseSuccess<R> = { success: true; result: R }

export type MeetingUseCaseResult<R> =
  | MeetingUseCaseSuccess<R>
  | MeetingUseCaseError

export type MeetingUseCaseCallback<R> = (data: MeetingUseCaseResult<R>) => void

export type ApiListenEventsMap = {
  StartMeeting: (
    request: UserCreateMeetingRequestDto,
    callback: MeetingUseCaseCallback<MeetingWithAuthInformationDto>
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
