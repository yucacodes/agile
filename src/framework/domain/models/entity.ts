import { generate as generateId } from 'short-uuid'
import { Model } from './model'

export interface EntityProps {
  id: string
  createdAt: Date
  updatedAt: Date
  discardedAt?: Date
  isNew?: boolean
  wasUpdated?: boolean
}

export abstract class Entity<P extends EntityProps> extends Model<P> {
  protected static factoryBaseProps(): EntityProps {
    return {
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isNew: true,
      wasUpdated: true,
    }
  }

  constructor(props: P) {
    super(
      new Proxy(props, {
        set(target, key, value) {
          ;(target as any)[key] = value // eslint-disable-line
          target.updatedAt = new Date()
          target.wasUpdated = true
          return true
        },
      })
    )
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

  discardedAt(): Date | undefined {
    return this.props.discardedAt && new Date(this.props.discardedAt)
  }

  protected isNew(): boolean {
    return this.props.isNew ?? false
  }

  protected wasUpdated(): boolean {
    return this.props.wasUpdated ?? false
  }

  protected setAsSaved() {
    this.props.isNew = false
    this.props.wasUpdated = false
  }

  protected setAsUpdated() {
    this.props.updatedAt = new Date()
    this.props.wasUpdated = true
  }
}
