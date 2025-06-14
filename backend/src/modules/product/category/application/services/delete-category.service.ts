import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepositoryInterface } from '@/modules/product/category/domain/repositories/category.repository';

@Injectable()
export class DeleteCategoryService {
  constructor(
    @Inject(CategoryRepositoryInterface)
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async execute(id: number): Promise<void> {
    const existingCategory = await this.categoryRepository.findById(id);
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.delete(id);
  }
}
