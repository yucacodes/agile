import { Entity, type EntityProps } from './entity'

export const userRolesValues = ['MeetingManager', 'MeetingParticipant'] as const

export type UserRole = (typeof userRolesValues)[number]

export interface UserFactoryProps {
  roles: UserRole[]
}

export interface UserProps extends EntityProps {
  roles: UserRole[]
}

export class User extends Entity<UserProps> {
  static factory(props: UserFactoryProps): User {
    return new User({
      ...this.factoryBaseProps(),
      roles: props.roles,
    })
  }

  public roles(): readonly UserRole[] {
    return [...this.props.roles]
  }

  public validate(): void {
    // TODO: implement
  }
}
