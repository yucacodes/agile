import { TimeProvider } from '@framework/domain'
import { singleton } from '@framework/injection'

@singleton()
export class ServerTimeManager extends TimeProvider {
  now(): Date {
    return new Date()
  }
}
