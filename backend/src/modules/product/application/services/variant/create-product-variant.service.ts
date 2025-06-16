import { ProductRepositoryInterface } from '@/modules/product/domain/repositories/product.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductVariantDto } from '@/modules/product/application/dtos/create-product-variant.dto';
import { ProductVariant } from '@/modules/product/domain/entities/product/product-variant.entity';
import { ProductVariantAttributeValue } from '@/modules/product/domain/entities/product/product-variant-attribute-value.entity';

@Injectable()
export class CreateProductVariantService {
  constructor(
    @Inject(ProductRepositoryInterface)
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(productId: number, dto: CreateProductVariantDto) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const attributes = dto.attributes.map(
      (attr) =>
        new ProductVariantAttributeValue({
          attributeId: attr.attributeId,
          stringValue: attr.stringValue,
          numberValue: attr.numberValue,
          booleanValue: attr.booleanValue,
          dateValue: attr.dateValue,
        }),
    );

    const variant = new ProductVariant({
      sku: dto.sku,
      attributes,
    });

    product.addVariant(variant);
    await this.productRepository.saveVariant(productId, variant);
  }
}
