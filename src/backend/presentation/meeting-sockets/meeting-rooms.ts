export function meetingRoomId(props: { meetingId: string }): string {
  return `meeting:${props.meetingId}`
}
