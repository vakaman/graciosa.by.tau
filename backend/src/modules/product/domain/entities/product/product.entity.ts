import { ProductStatus } from '@/modules/product/domain/enums/product-status.enum';
import { ProductVariant } from '@/modules/product/domain/entities/product/product-variant.entity';

export class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public categoryId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly variants: ProductVariant[] = [],
    public tags: string[] = [],
    public seoTitle: string | null = null,
    public seoDescription: string | null = null,
    public status: ProductStatus = ProductStatus.INACTIVE,
  ) {}

  withVariants(variants: ProductVariant[]): Product {
    return new Product(
      this.id,
      this.name,
      this.description,
      this.categoryId,
      this.createdAt,
      this.updatedAt,
      variants,
    );
  }

  addVariant(variant: ProductVariant) {
    this.variants.push(variant);
  }
}
