import { Category } from '@/modules/product/domain/entities/category/category.entity';

export const CategoryRepositoryInterface = Symbol(
  'CategoryRepositoryInterface',
);

export interface CategoryRepositoryInterface {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  save(category: Category): Promise<void>;
  delete(id: number): Promise<void>;
}
