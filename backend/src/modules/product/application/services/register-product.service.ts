import { Inject, Injectable } from '@nestjs/common';
import {
  ProductRepositoryInterface,
  ProductRepositoryInterface as ProductRepo,
} from '@/modules/product/domain/repositories/product.repository';
import { Product } from '@/modules/product/domain/entities/product.entity';
import {
  CategoryRepositoryInterface,
  CategoryRepositoryInterface as CategoryRepo,
} from '@/modules/product/category/domain/repositories/category.repository';
import { ProductAlreadyExistsError } from '../../domain/exceptions/product-already-exists.error';
import { CategoryNotFoundError } from '../../domain/exceptions/category-not-found.error';

@Injectable()
export class RegisterProductService {
  constructor(
    @Inject(ProductRepo)
    private readonly productRepository: ProductRepositoryInterface,

    @Inject(CategoryRepo)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async execute(
    name: string,
    description: string,
    categoryId: number,
  ): Promise<void> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new CategoryNotFoundError();
    }

    const existing = await this.productRepository.findByName(name);
    if (existing) {
      throw new ProductAlreadyExistsError();
    }

    const now = new Date();
    const product = new Product(0, name, description, categoryId, now, now);
    await this.productRepository.save(product);
  }
}
