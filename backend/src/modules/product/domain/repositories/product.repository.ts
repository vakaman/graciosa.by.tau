import { Product } from '@/modules/product/domain/entities/product.entity';
import { ProductFilters } from '@/modules/product/application/dtos/product-filters.dto';

export const ProductRepositoryInterface = Symbol('ProductRepositoryInterface');

export interface ProductRepositoryInterface {
  findAllPaginated(
    page: number,
    limit: number,
    orderBy: string,
    order: 'asc' | 'desc',
    filters: ProductFilters,
  ): Promise<{ data: Product[]; total: number }>;

  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  delete(id: number): Promise<void>;
}
