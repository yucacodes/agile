import type { User } from '@domain'
import { singleton } from 'tsyringe'
import type { AuthInformationDto } from '../dtos'

@singleton()
export class GenerateAuthInformation {
  perform(user: User): AuthInformationDto {
    return {
      userId: user.id(),
      roles: user.roles(),
    }
  }
}
