import type { UserCreateMeetingRequestDto } from '@application'
import { UserCreateMeeting } from '@application'
import { container } from 'tsyringe'
import type { OnStartMeetingCallback } from '../api-events'

export function onStartMeetingHandler(
  request: UserCreateMeetingRequestDto,
  callback: OnStartMeetingCallback
) {
  const service = container.resolve(UserCreateMeeting)
  // TODO: register socket in brodcaster
  service.perform(request).then(callback)
}
