import { type Model } from '../domain'

type ModelProps<M> = M extends Model<infer P> ? P : unknown

export class DboMapper {
  modelProps<M extends Model<unknown>>(model: M): ModelProps<M> {
    return model['props'] as any
  }
}
