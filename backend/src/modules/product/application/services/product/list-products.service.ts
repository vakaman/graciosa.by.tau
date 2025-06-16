import { Inject, Injectable } from '@nestjs/common';
import {
  ProductRepositoryInterface,
  ProductRepositoryInterface as ProductRepo,
} from '@/modules/product/domain/repositories/product.repository';
import { Product } from '@/modules/product/domain/entities/product/product.entity';

@Injectable()
export class ListProductsService {
  constructor(
    @Inject(ProductRepo)
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
