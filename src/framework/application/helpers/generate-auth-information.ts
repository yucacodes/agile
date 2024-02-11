import type { User } from '@framework/domain'
import { singleton } from '@framework/injection'
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
