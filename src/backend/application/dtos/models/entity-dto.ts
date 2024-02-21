import type { Entity, EntityProps } from '@domain'

export interface EntityDto {
  id: string
  createdAt: string
  updatedAt: string
}

export class EntityDtoMapper {
  map<P extends EntityProps, E extends Entity<P>>(obj: E): EntityDto {
    return {
      id: obj.id(),
      createdAt: obj.createdAt().toISOString(),
      updatedAt: obj.updatedAt().toISOString(),
    }
  }
}
