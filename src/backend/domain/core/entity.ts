import shortUUID from 'short-uuid'
import { Model } from './model'
import { type TimeProvider } from '@yucacodes/es'

export interface EntityProps {
  id: string
  createdAt: Date
  updatedAt: Date
  discardedAt?: Date
}

export abstract class Entity<P extends EntityProps> extends Model<P> {
  protected static factoryEntityProps(timeProvider: TimeProvider): EntityProps {
    return {
      id: shortUUID.generate(),
      createdAt: timeProvider.now(),
      updatedAt: timeProvider.now(),
    }
  }

  constructor(
    props: P,
    protected readonly timeProvider: TimeProvider
  ) {
    const proxy = new Proxy(props, {
      set(target: any, key: any, value) {
        target[key] = value
        target.updatedAt = timeProvider.now()
        return true
      },
    })
    super(proxy)
  }

  id() {
    return this.props.id
  }

  createdAt(): Date {
    return new Date(this.props.createdAt)
  }

  updatedAt(): Date {
    return new Date(this.props.updatedAt)
  }

  discard() {
    this.props.discardedAt = this.timeProvider.now()
  }

  isDiscarded(): boolean {
    return this.props.discardedAt !== undefined
  }

  discardedAt(): Date | undefined {
    return this.props.discardedAt && new Date(this.props.discardedAt)
  }

  protected notifyUpdate() {
    this.props.updatedAt = this.timeProvider.now()
  }
}
