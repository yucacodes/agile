import { generate as generateId } from 'short-uuid'

export interface EntityProps {
  id: string
  createdAt: Date
  updatedAt: Date
  discardedAt?: Date
  isNew?: boolean
  wasUpdated?: boolean
}

export abstract class Entity<P extends EntityProps> {
  protected static factoryBaseProps(): EntityProps {
    return {
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isNew: true,
      wasUpdated: true,
    }
  }

  protected readonly props: P

  constructor(props: P) {
    this.props = new Proxy(props, {
      set(target, key, value) {
        Object.assign(target, { [key]: value })
        target.updatedAt = new Date()
        target.wasUpdated = true
        return true
      },
    })
  }

  id() {
    return this.props.id
  }

  isNew(): boolean {
    return this.props.isNew ?? false
  }

  wasUpdated(): boolean {
    return this.props.wasUpdated ?? false
  }

  createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  updatedAt(): Date {
    return new Date(this.props.updatedAt);
  }

  public setAsSaved() {
    this.props.isNew = false
    this.props.wasUpdated = false
  }

  public abstract validate(): void
}
