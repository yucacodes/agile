import { TimeManager } from '@framework/domain'
import { singleton } from '@framework/injection'

@singleton()
export class ServerTimeManager extends TimeManager {
  now(): Date {
    return new Date()
  }
}
