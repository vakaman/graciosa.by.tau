import { Account } from './Account'

export interface AccountRepository {
  findByEmail(email: string): Promise<Account | null>
  findById(id: string): Promise<Account | null>
  save(account: Account): Promise<void>
}
