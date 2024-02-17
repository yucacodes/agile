import { MeetingsRepository, type Meeting, type MeetingProps } from '@domain'
import { singleton } from '@framework/injection'
import { DummyRepositoryHelper } from './dummy-repository-helper'

const items: Map<string, Meeting> = new Map()

@singleton()
export class MeetingsDummyRepository extends MeetingsRepository {
  private helper: DummyRepositoryHelper<MeetingProps, Meeting> =
    new DummyRepositoryHelper(items)

  async findById(id: string): Promise<Meeting | null> {
    return this.helper.fetchById(id)
  }

  async findByIds(ids: string[]): Promise<Map<string, Meeting>> {
    return this.helper.fetchByIds(ids)
  }

  async saveNew(entity: Meeting): Promise<void> {
    this.helper.persistEntities([entity])
  }
  async saveUpdate(entity: Meeting): Promise<void> {
    this.helper.persistEntities([entity])
  }
}
