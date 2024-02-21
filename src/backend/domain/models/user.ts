import { type TimeProvider } from '@framework'
import { Entity, type EntityProps } from '../core/entity'

export interface UserFactoryProps {
  timeProvider: TimeProvider
}

export interface UserProps extends EntityProps {}

export class User extends Entity<UserProps> {
  static factory(props: UserFactoryProps): User {
    return new User(
      {
        ...this.factoryEntityProps(props.timeProvider),
      },
      props.timeProvider
    )
  }
}
