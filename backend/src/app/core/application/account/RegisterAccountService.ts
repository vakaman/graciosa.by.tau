import { AccountRepository } from '@/app/core/domain/account/AccountRepository'
import { Account } from '@/app/core/domain/account/Account'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

export class RegisterAccountService {
  constructor(private readonly accountRepo: AccountRepository) {}

  async execute(params: { name: string, email: string, password: string }) {
    const existing = await this.accountRepo.findByEmail(params.email)

    if (existing) {
      throw new Error('E-mail já cadastrado')
    }

    const passwordHash = await bcrypt.hash(params.password, 10)

    const account = new Account({
      id: uuidv4(),
      email: params.email,
      name: params.name,
      passwordHash
    })

    await this.accountRepo.save(account)
  }
}
