import { Product } from '@/modules/product/domain/entities/product/product.entity';
import { ProductFilters } from '@/modules/product/application/dtos/product-filters.dto';
import { ProductVariant } from '@/modules/product/domain/entities/product/product-variant.entity';

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
  findByIdWithVariants(id: number): Promise<Product | null>;
  saveVariant(productId: number, variant: ProductVariant): Promise<void>;
}
