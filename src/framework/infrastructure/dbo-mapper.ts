import { singleton } from 'tsyringe'
import { type Constructor } from '../generics'

export type DboMapper<M, DBO> = {
  map(model: M): DBO
  revert(dbo: DBO): M
}

export interface dboMapperConfig<M> {
  model: Constructor<M>
}

export function dboMapper<M>(config: dboMapperConfig<M>) {
  return <DBO>(constructor: Constructor<DboMapper<M, DBO>>) => {
    constructor.prototype.__config__ = function __config__() {
      return config
    }
    singleton()(constructor)
  }
}
