import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ProductRepositoryInterface } from '@/modules/product/domain/repositories/product.repository';
import { Product } from '@/modules/product/domain/entities/product.entity';
import { ProductFilters } from '@/modules/product/application/dtos/product-filters.dto';
import { ProductVariant } from '@/modules/product/domain/entities/product-variant.entity';
import { Money } from '@/modules/shared/value-objects/money';

import {
  Prisma,
  Product as PrismaProduct,
  ProductVariant as PrismaProductVariant,
} from '@prisma/client';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPaginated(
    page: number,
    limit: number,
    orderBy: string,
    order: 'asc' | 'desc',
    filters: ProductFilters,
  ): Promise<{ data: Product[]; total: number }> {
    const whereClause: Prisma.ProductWhereInput = {};

    if (filters.name) {
      whereClause.name = filters.exactName
        ? filters.name
        : { contains: filters.name, mode: 'insensitive' };
    }

    if (filters.description) {
      whereClause.description = filters.exactDescription
        ? filters.description
        : { contains: filters.description, mode: 'insensitive' };
    }

    if (filters.categoryId !== undefined) {
      whereClause.categoryId = filters.categoryId;
    }

    const [total, data] = await Promise.all([
      this.prisma.product.count({ where: whereClause }),
      this.prisma.product.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [orderBy]: order,
        },
      }),
    ]);

    const result = data.map((item) => this.mapToDomain(item));

    return { data: result, total };
  }

  async findAll(): Promise<Product[]> {
    const data = await this.prisma.product.findMany();
    return data.map((item) => this.mapToDomain(item));
  }

  async findById(
    id: number,
    withVariants: boolean = false,
  ): Promise<Product | null> {
    const data = (await this.prisma.product.findUnique({
      where: { id },
      include: withVariants ? { variants: true } : undefined,
    })) as (PrismaProduct & { variants?: PrismaProductVariant[] }) | null;

    if (!data) return null;

    return this.mapToDomain(data);
  }

  private mapToDomain(
    data: PrismaProduct & { variants?: PrismaProductVariant[] },
  ): Product {
    const variants =
      data.variants?.map(
        (variant) =>
          new ProductVariant(
            variant.id,
            variant.color,
            variant.size,
            Money.fromCents(variant.price),
            variant.sku,
            variant.createdAt,
            variant.updatedAt,
          ),
      ) ?? [];

    return new Product(
      data.id,
      data.name,
      data.description,
      data.categoryId,
      data.createdAt,
      data.updatedAt,
      variants,
    );
  }

  async findByName(name: string): Promise<Product | null> {
    const data = await this.prisma.product.findFirst({ where: { name } });
    if (!data) return null;

    return this.mapToDomain(data);
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
