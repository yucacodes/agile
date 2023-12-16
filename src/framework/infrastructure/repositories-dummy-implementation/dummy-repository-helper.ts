import type { Entity, EntityProps } from '@framework/domain'

export class DummyRepositoryHelper<P extends EntityProps, E extends Entity<P>> {
  constructor(private items: Map<string, E> = new Map()) {}

  fetchById(id: string): E | null {
    return this.items.get(id) ?? null
  }

  fetchByIds(ids: string[]): Map<string, E> {
    const result = new Map<string, E>()
    ids.forEach((id) => {
      const found = this.items.get(id)
      if (found) result.set(found.id(), found)
    })
    return result
  }

  persistEntities(entities: E[]): void {
    entities.forEach((x) => this.items.set(x.id(), x))
  }
}
