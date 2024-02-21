import { type ValidationError } from 'class-validator'
import pino, { type Logger as PinoLogger } from 'pino'

export class Logger {
  private logger: PinoLogger

  constructor(baseName: string | Function) {
    baseName = typeof baseName === 'string' ? baseName : baseName.name
    this.logger = pino({
      formatters: {
        bindings: (x) => ({ ...x, pid: baseName }),
      },
    })
  }

  trace(message: string): void {
    this.logger.trace(message)
  }

  debug(message: string): void {
    this.logger.debug(message)
  }

  info(message: string): void {
    this.logger.info(message)
  }

  warn(message: string): void {
    this.logger.warn(message)
  }

  error(message: string, error?: Error | ValidationError[]): void {
    this.logger.error(error, message)
  }
}
