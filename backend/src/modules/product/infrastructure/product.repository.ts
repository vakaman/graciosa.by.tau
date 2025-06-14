import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ProductRepositoryInterface } from '@/modules/product/domain/repositories/product.repository';
import { Product } from '@/modules/product/domain/entities/product.entity';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const data = await this.prisma.product.findMany();
    return data.map(item =>
      new Product(item.id, item.name, item.description, item.categoryId, item.createdAt, item.updatedAt)
    );
  }

  async findById(id: number): Promise<Product | null> {
    const data = await this.prisma.product.findUnique({ where: { id } });
    if (!data) return null;

    return new Product(data.id, data.name, data.description, data.categoryId, data.createdAt, data.updatedAt);
  }

  async findByName(name: string): Promise<Product | null> {
    const data = await this.prisma.product.findFirst({ where: { name } });
    if (!data) return null;

    return new Product(data.id, data.name, data.description, data.categoryId, data.createdAt, data.updatedAt);
  }

  async save(product: Product): Promise<void> {
    await this.prisma.product.upsert({
      where: { id: product.id || 0 },
      update: {
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        updatedAt: product.updatedAt,
      },
      create: {
        name: product.name,
        description: product.description,
        categoryId: product.categoryId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
