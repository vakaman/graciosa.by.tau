import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepositoryInterface, ProductRepositoryInterface as ProductRepo } from '@/modules/product/domain/repositories/product.repository';

@Injectable()
export class DeleteProductService {
  constructor(
    @Inject(ProductRepo)
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete(id);
  }
}
