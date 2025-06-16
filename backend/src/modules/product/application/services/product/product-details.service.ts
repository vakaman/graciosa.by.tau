import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@/modules/product/domain/entities/product/product.entity';
import { ProductRepositoryInterface } from '../../../domain/repositories/product.repository';

@Injectable()
export class ProductDetailsService {
  constructor(
    @Inject(ProductRepositoryInterface)
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async getProductDetail(
    productId: number,
    variationId?: number,
  ): Promise<Product> {
    const product =
      await this.productRepository.findByIdWithVariants(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!variationId) {
      return product;
    }

    const variant = product.variants.find((v) => v.id === variationId);

    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    return product.withVariants([variant]);
  }

  async getVariantDetails(
    productId: number,
    variantId: number,
  ): Promise<Product> {
    const product =
      await this.productRepository.findByIdWithVariants(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const variant = product.variants.find((v) => v.id === variantId);

    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    return product.withVariants([variant]);
  }
}
