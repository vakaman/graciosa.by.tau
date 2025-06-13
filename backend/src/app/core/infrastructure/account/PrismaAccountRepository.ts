
import { AccountRepository } from '@/app/core/domain/account/AccountRepository'
import { Account } from '@/app/core/domain/account/Account'
import { PrismaClient } from '@prisma/client'


export class PrismaAccountRepository implements AccountRepository {
  private prisma = new PrismaClient()

  async findByEmail(email: string): Promise<Account | null> {
    const data = await this.prisma.account.findUnique({ where: { email } })

    if (!data) return null

    return new Account({
      id: data.id,
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash || undefined,
      googleId: data.googleId || undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }

  async findById(id: string): Promise<Account | null> {
    const data = await this.prisma.account.findUnique({ where: { id } })

    if (!data) return null

    return new Account({
      id: data.id,
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash || undefined,
      googleId: data.googleId || undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }

  async save(account: Account): Promise<void> {
    await this.prisma.account.upsert({
      where: { id: account.id },
      update: {
        email: account.email,
        name: account.name,
        passwordHash: account.passwordHash,
        googleId: account.googleId,
        createdAt: account.updatedAt
      },
      create: {
        id: account.id,
        email: account.email,
        name: account.name,
        passwordHash: account.passwordHash,
        googleId: account.googleId,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt
      }
    })
  }
}
