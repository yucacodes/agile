import type { UserRole } from '@domain'

export interface AuthInformationDto {
  userId: string
  roles: readonly UserRole[]
}
