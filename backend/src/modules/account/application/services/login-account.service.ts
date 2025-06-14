import { Inject, Injectable } from '@nestjs/common';
import { AccountRepositoryInterface } from '@/modules/account/domain/repositories/account.repository';
import { InvalidCredentialsError } from '@/modules/account/domain/exceptions/invalid-credentials.error';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta-superforte';

@Injectable()
export class LoginAccountService {
  constructor(
    @Inject(AccountRepositoryInterface)
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const account = await this.accountRepository.findByEmail(email);
    if (!account || !account.passwordHash) {
      throw new InvalidCredentialsError();
    }

    const isValid = await bcrypt.compare(password, account.passwordHash);
    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign(
      { userId: account.id, email: account.email },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    return token;
  }
}
