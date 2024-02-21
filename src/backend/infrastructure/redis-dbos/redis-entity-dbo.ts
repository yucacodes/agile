import type { Entity, EntityProps } from '@domain'
import { implementation } from '@framework'

export interface RedisEntityDbo {
  id: string
  createdAt: number
  updatedAt: number
  discardedAt?: number
}

@implementation({ singleton: true })
export class RedisEntityDboMapperHelper {
  map<P extends EntityProps>(entity: Entity<P>): RedisEntityDbo {
    const props = entity['props']
    return {
      id: props.id,
      createdAt: props.createdAt.getTime(),
      updatedAt: props.updatedAt.getTime(),
      discardedAt: props.discardedAt && props.discardedAt.getTime(),
    }
  }

  revertProps(dbo: RedisEntityDbo): EntityProps {
    return {
      id: dbo.id,
      createdAt: new Date(dbo.createdAt),
      updatedAt: new Date(dbo.updatedAt),
      discardedAt:
        dbo.discardedAt == undefined ? undefined : new Date(dbo.discardedAt),
    }
  }
}
