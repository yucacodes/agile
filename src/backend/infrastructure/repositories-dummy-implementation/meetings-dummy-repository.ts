import { Meeting, MeetingProps, MeetingsRepository} from '@domain'
import { DummyRepositoryHelper } from './dummy-repository-helper'
import { singleton } from 'tsyringe'

@singleton()
export class MeetingsDummyRepository extends MeetingsRepository {
  private items: Map<string, Meeting> = new Map()
  private helper: DummyRepositoryHelper<MeetingProps, Meeting> =
    new DummyRepositoryHelper(this.items)

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
