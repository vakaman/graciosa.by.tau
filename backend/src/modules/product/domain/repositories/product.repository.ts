import { Product } from '@/modules/product/domain/entities/product.entity';

export const ProductRepositoryInterface = Symbol('ProductRepositoryInterface');

export interface ProductRepositoryInterface {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  delete(id: number): Promise<void>;
}
