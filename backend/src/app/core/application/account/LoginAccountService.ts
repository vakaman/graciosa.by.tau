import { AccountRepository } from '@/app/core/domain/account/AccountRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta-superforte'

export class LoginAccountService {
  constructor(private readonly accountRepo: AccountRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const account = await this.accountRepo.findByEmail(email)

    if (!account || !account.passwordHash) {
      throw new Error('Invalid credentials')
    }

    const isValid = await bcrypt.compare(password, account.passwordHash)

    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign(
      { userId: account.id, email: account.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    return token
  }
}
