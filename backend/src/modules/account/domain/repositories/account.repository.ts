import { Account } from '@/modules/account/domain/entities/account.entity';

export interface AccountRepositoryInterface {
  findById(id: string): Promise<Account | null>;
  findByEmail(email: string): Promise<Account | null>;
  save(account: Account): Promise<void>;
}

export const AccountRepositoryInterface = Symbol('AccountRepositoryInterface');
