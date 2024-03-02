import type { RefreshToken } from '../models'

export abstract class RefreshTokensRepository {
  abstract findById(id: string): Promise<RefreshToken | null>
  abstract saveNew(entity: RefreshToken): Promise<void> 
  abstract saveUpdate(entity: RefreshToken): Promise<void>
}
