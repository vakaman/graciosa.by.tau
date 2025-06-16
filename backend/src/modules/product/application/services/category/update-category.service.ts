import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepositoryInterface } from '@/modules/product/domain/repositories/category.repository';
import { Category } from '@/modules/product/domain/entities/category/category.entity';

@Injectable()
export class UpdateCategoryService {
  constructor(
    @Inject(CategoryRepositoryInterface)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async execute(id: number, name: string): Promise<void> {
    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    const updatedCategory = new Category(
      id,
      name,
      existingCategory.createdAt,
      new Date(),
    );

    await this.categoryRepository.save(updatedCategory);
  }
}
