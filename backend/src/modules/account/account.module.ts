import { Module } from '@nestjs/common';
import { RegisterAccountService } from '@/modules/account/application/services/register-account.service';
import { AccountController } from '@/modules/account/application/controllers/account.controller';
import { AccountRepositoryInterface } from '@/modules/account/domain/repositories/account.repository';
import { AccountRepository } from '@/modules/account/infrastructure/account.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginAccountService } from '@/modules/account/application/services/login-account.service';

@Module({
  controllers: [AccountController],
  providers: [
    RegisterAccountService,
    LoginAccountService,
    PrismaService,
    {
      provide: AccountRepositoryInterface,
      useClass: AccountRepository,
    },
  ],
})
export class AccountModule {}
