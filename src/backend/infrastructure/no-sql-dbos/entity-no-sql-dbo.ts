import type { Entity, EntityProps } from '@domain'
import { singleton } from '@framework/injection'

export interface EntityNoSqlDbo {
  id: string
  createdAt: number
  updatedAt: number
  discardedAt?: number
}

@singleton()
export class EntityNoSqlDboMapperHelper {
  map<P extends EntityProps>(entity: Entity<P>): EntityNoSqlDbo {
    const props = entity['props']
    return {
      id: props.id,
      createdAt: props.createdAt.getTime(),
      updatedAt: props.updatedAt.getTime(),
      discardedAt: props.discardedAt && props.discardedAt.getTime(),
    }
  }

  revertProps(dbo: EntityNoSqlDbo): EntityProps {
    return {
      id: dbo.id,
      createdAt: new Date(dbo.createdAt),
      updatedAt: new Date(dbo.updatedAt),
      discardedAt:
        dbo.discardedAt == undefined ? undefined : new Date(dbo.discardedAt),
    }
  }
}
