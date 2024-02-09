import { singleton } from 'tsyringe'
import { type EntityProps, type Entity } from '../../domain'
import { DboMapper } from '../dbo-mapper'

export interface EntityNoSqlDbo {
  id: string
  createdAt: number
  updatedAt: number
  discardedAt?: number
  isNew?: boolean
  wasUpdated?: boolean
}

@singleton()
export class EntityNoSqlDboMapper extends DboMapper {
  makeDbo<P extends EntityProps, E extends Entity<P>>(obj: E): EntityNoSqlDbo {
    return {
      id: obj.id(),
      createdAt: obj.createdAt().getTime(),
      updatedAt: obj.updatedAt().getTime(),
      discardedAt: obj.discardedAt()?.getTime(),
    }
  }

  loadBaseProps(dbo: EntityNoSqlDbo): EntityProps {
    return {
      id: dbo.id,
      createdAt: new Date(dbo.createdAt),
      updatedAt: new Date(dbo.updatedAt),
      discardedAt: dbo.discardedAt ? new Date(dbo.discardedAt) : undefined,
      isNew: false,
      wasUpdated: false,
    }
  }
}
