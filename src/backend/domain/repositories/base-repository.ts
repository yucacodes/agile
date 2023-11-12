import type { EntityProps, Entity } from '../models'

export abstract class BaseRepository<
  P extends EntityProps,
  E extends Entity<P>,
> {
  abstract fetchById(id: string): Promise<E | null>

  abstract fetchByIds(ids: string[]): Promise<Map<string, E>>

  async save(entity: E): Promise<void> {
    entity.validate()
    if (entity.isNew()) await this.persistNewEntities([entity])
    else if (entity.wasUpdated()) await this.persistEntitiesUpdates([entity])
    entity.setAsSaved()
  }

  async saveCollection(entities: E[]): Promise<void> {
    const newEntities = entities.filter((x) => x.isNew())
    const updatedEntitities = entities.filter((x) => x.wasUpdated())
    newEntities.forEach((x) => x.validate())
    updatedEntitities.forEach((x) => x.validate())
    await Promise.all([
      this.persistNewEntities(newEntities),
      this.persistEntitiesUpdates(updatedEntitities),
    ])
    entities.forEach(x => x.setAsSaved())
  }

  protected abstract persistNewEntities(entities: E[]): Promise<void>
  protected abstract persistEntitiesUpdates(entities: E[]): Promise<void>
}
