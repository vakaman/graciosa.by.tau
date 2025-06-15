import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ProductRepositoryInterface,
  ProductRepositoryInterface as ProductRepo,
} from '@/modules/product/domain/repositories/product.repository';
import { Product } from '@/modules/product/domain/entities/product.entity';

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject(ProductRepo)
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(
    id: number,
    name: string,
    description: string,
    categoryId: number,
  ): Promise<void> {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    const updated = new Product(
      existing.id,
      name,
      description,
      categoryId,
      existing.createdAt,
      new Date(),
    );

    await this.productRepository.save(updated);
  }
}
