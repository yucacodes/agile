import { MeetingWithAuthInformationDto, UserCreateMeeting, UserCreateMeetingRequestDto } from '@application';
import { container } from 'tsyringe'

export type OnStartMeetingCallback = (data: MeetingWithAuthInformationDto) => void;

export function onStartMeetingHandler(
  request: UserCreateMeetingRequestDto, 
  callback: OnStartMeetingCallback,
) {
    const service = container.resolve(UserCreateMeeting);
    service.perform(request).then(callback);
}
