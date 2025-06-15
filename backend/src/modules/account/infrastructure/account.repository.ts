import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AccountRepositoryInterface } from '@/modules/account/domain/repositories/account.repository';
import { Account } from '@/modules/account/domain/entities/account.entity';
import { Account as PrismaAccount } from '@prisma/client';

@Injectable()
export class AccountRepository implements AccountRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Account | null> {
    const data = await this.prisma.account.findUnique({ where: { id } });
    return data ? this.mapToDomain(data) : null;
  }

  async findByEmail(email: string): Promise<Account | null> {
    const data = await this.prisma.account.findUnique({ where: { email } });
    return data ? this.mapToDomain(data) : null;
  }

  async save(account: Account): Promise<void> {
    await this.prisma.account.upsert({
      where: { id: account.id },
      update: {
        email: account.email,
        name: account.name,
        passwordHash: account.passwordHash,
        updatedAt: account.updatedAt,
      },
      create: {
        id: account.id,
        email: account.email,
        name: account.name,
        passwordHash: account.passwordHash,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      },
    });
  }

  private mapToDomain(data: PrismaAccount): Account {
    return new Account(
      data.id,
      data.email,
      data.passwordHash ?? '',
      data.name,
      data.createdAt,
      data.updatedAt,
    );
  }
}
