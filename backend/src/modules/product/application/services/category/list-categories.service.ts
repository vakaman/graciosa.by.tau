import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepositoryInterface } from '@/modules/product/domain/repositories/category.repository';
import { Category } from '@/modules/product/domain/entities/category/category.entity';

@Injectable()
export class ListCategoriesService {
  constructor(
    @Inject(CategoryRepositoryInterface)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
