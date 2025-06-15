import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CategoryRepositoryInterface } from '@/modules/product/category/domain/repositories/category.repository';
import { Category } from '@/modules/product/category/domain/entities/category.entity';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    const data = await this.prisma.category.findMany();
    return data.map(
      (item) =>
        new Category(item.id, item.name, item.createdAt, item.updatedAt),
    );
  }

  async findById(id: number): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({ where: { id } });
    if (!data) return null;

    return new Category(data.id, data.name, data.createdAt, data.updatedAt);
  }

  async findByName(name: string): Promise<Category | null> {
    const data = await this.prisma.category.findUnique({ where: { name } });
    if (!data) return null;

    return new Category(data.id, data.name, data.createdAt, data.updatedAt);
  }

  async save(category: Category): Promise<void> {
    await this.prisma.category.upsert({
      where: { id: category.id || 0 },
      update: { name: category.name, updatedAt: category.updatedAt },
      create: {
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
