import { type TimeProvider } from '@framework/domain'
import { Entity, type EntityProps } from '../core/entity'
import { type UserRole } from './user-role'

export interface UserFactoryProps {
  roles: UserRole[]
  timeProvider: TimeProvider
}

export interface UserProps extends EntityProps {
  roles: Set<UserRole>
}

export class User extends Entity<UserProps> {
  static factory(props: UserFactoryProps): User {
    return new User(
      {
        ...this.factoryEntityProps(props.timeProvider),
        roles: new Set(props.roles),
      },
      props.timeProvider
    )
  }

  public roles(): readonly UserRole[] {
    return [...this.props.roles]
  }
}
