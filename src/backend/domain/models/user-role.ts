export const userRolesValues = ['MeetingParticipant'] as const
export type UserRole = (typeof userRolesValues)[number]
