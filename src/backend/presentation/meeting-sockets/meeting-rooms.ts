import { type MeetingAndSecretDto } from '@application'
import { type MeetingSocket } from './meeting-socket'

export function meetingRoomId(props: { meetingId: string }): string {
  return `meeting:${props.meetingId}`
}

export function registerSocketToRoom(
  socket: MeetingSocket,
  data: MeetingAndSecretDto
) {
  socket.data = { auth: data.authInfo, meetingId: data.meeting.id }
  socket.join(meetingRoomId({ meetingId: data.meeting.id }))
}
