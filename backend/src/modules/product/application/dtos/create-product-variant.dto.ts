import { ProductVariantAttributeValueDto } from '@/modules/product/application/dtos/product-variant-attribute-value.dto';

export class CreateProductVariantDto {
  sku: string;
  attributes: ProductVariantAttributeValueDto[];
}
