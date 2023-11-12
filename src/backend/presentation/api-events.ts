import type {
  MeetingWithAuthInformationDto,
  UserCreateMeetingRequestDto,
} from '@application'

export type OnStartMeetingCallback = (
  data: MeetingWithAuthInformationDto
) => void

export type ApiListenEventsMap = {
  StartMeeting: (
    request: UserCreateMeetingRequestDto,
    callback: OnStartMeetingCallback
  ) => void
}

export type ApiEmmitedEventsMap = {}

export type ApiServerEventsMap = {}

export type ApiListenEvent = keyof ApiListenEventsMap
export type ApiEmmitedEvent = keyof ApiEmmitedEventsMap
export type ApiServerEvent = keyof ApiServerEventsMap
