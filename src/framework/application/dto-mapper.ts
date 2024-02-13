import { singleton } from 'tsyringe'
import { type Constructor } from '../generics'

export type DtoMapper<M, DTO> = {
  map(model: M): DTO
}

export interface dtoMapperConfig<M> {
  group?: string
  model: Constructor<M>
}

export function dtoMapper<M>(config: dtoMapperConfig<M>) {
  return <DTO>(constructor: Constructor<DtoMapper<M, DTO>>) => {
    constructor.prototype.__config__ = function __config__() {
      return config
    }
    singleton()(constructor)
  }
}
