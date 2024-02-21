import type { AbstractConstructor, Constructor } from './generics'

export interface implementationConfig<T> {
  base: Constructor<T> | AbstractConstructor<T>
}

export function implementation<T>(config: implementationConfig<T>) {
  return <P extends T>(constructor: Constructor<P>) => {
    constructor.prototype.__config__ = function __config__() {
      return config
    }
  }
}
