import { Inject, Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from '../../../domain/repositories/product.repository';
import { Product } from '@/modules/product/domain/entities/product/product.entity';
import { ProductFilters } from '@/modules/product/application/dtos/product-filters.dto';

@Injectable()
export class ListPaginatedProductsService {
  constructor(
    @Inject(ProductRepositoryInterface)
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(params: {
    page: number;
    limit: number;
    orderBy: string;
    order: 'asc' | 'desc';
    filters: ProductFilters;
  }): Promise<{ data: Product[]; total: number }> {
    return await this.productRepository.findAllPaginated(
      params.page,
      params.limit,
      params.orderBy,
      params.order,
      params.filters,
    );
  }
}
