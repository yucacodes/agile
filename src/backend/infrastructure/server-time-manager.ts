import { TimeManager } from '@domain'
import { singleton } from '@injection'

@singleton()
export class ServerTimeManager extends TimeManager {
  now(): Date {
    return new Date()
  }
}
