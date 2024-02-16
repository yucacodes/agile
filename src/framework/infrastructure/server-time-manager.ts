import { TimeProvider } from '@framework/domain'
import { singleton } from '@framework/injection'

@singleton()
export class ServerTimeProvider extends TimeProvider {
  now(): Date {
    return new Date()
  }
}
