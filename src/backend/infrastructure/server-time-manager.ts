import { TimeManager } from '@domain'
import { singleton } from 'tsyringe'

@singleton()
export class ServerTimeManager extends TimeManager {
  now(): Date {
    return new Date()
  }
}
