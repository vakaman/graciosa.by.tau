import { Inject, Injectable } from '@nestjs/common';
import {
  CategoryRepositoryInterface,
  CategoryRepositoryInterface as CategoryRepo,
} from '@/modules/product/category/domain/repositories/category.repository';
import { Category } from '@/modules/product/category/domain/entities/category.entity';

@Injectable()
export class RegisterCategoryService {
  constructor(
    @Inject(CategoryRepo)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async execute(name: string) {
    const existing = await this.categoryRepository.findByName(name);
    if (existing) {
      throw new Error('Category already exists');
    }

    const now = new Date();
    const category = new Category(0, name, now, now);
    await this.categoryRepository.save(category);
  }
}
