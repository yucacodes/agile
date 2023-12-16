import { type Meeting, type MeetingProps, MeetingsRepository } from '@domain'
import { DummyRepositoryHelper } from '@framework/infrastructure'
import { singleton } from '@framework/injection'


const items: Map<string, Meeting> = new Map()

@singleton()
export class MeetingsDummyRepository extends MeetingsRepository {
  private helper: DummyRepositoryHelper<MeetingProps, Meeting> =
    new DummyRepositoryHelper(items)

  async fetchById(id: string): Promise<Meeting | null> {
    return this.helper.fetchById(id)
  }

  async fetchByIds(ids: string[]): Promise<Map<string, Meeting>> {
    return this.helper.fetchByIds(ids)
  }

  protected async persistNewEntities(entities: Meeting[]): Promise<void> {
    this.helper.persistEntities(entities)
  }

  protected async persistEntitiesUpdates(entities: Meeting[]): Promise<void> {
    this.helper.persistEntities(entities)
  }
}
