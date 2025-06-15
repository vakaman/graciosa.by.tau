import { Inject, Injectable } from '@nestjs/common';
import { AccountRepositoryInterface } from '@/modules/account/domain/repositories/account.repository';
import { Account } from '@/modules/account/domain/entities/account.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyExistsError } from '@/modules/account/domain/exceptions/email-already-exists.error';

@Injectable()
export class RegisterAccountService {
  constructor(
    @Inject(AccountRepositoryInterface)
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  async execute(name: string, email: string, password: string) {
    const existing = await this.accountRepository.findByEmail(email);
    if (existing) {
      throw new EmailAlreadyExistsError();
    }

    const hash = await bcrypt.hash(password, 10);
    const account = new Account(
      uuidv4(),
      email,
      hash,
      name,
      new Date(),
      new Date(),
    );

    await this.accountRepository.save(account);
  }
}
