import type { UserRole } from '@framework/domain'

export interface AuthInformationDto {
  userId: string
  roles: readonly UserRole[]
}
