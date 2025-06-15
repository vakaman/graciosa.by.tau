import { ProductVariant } from './product-variant.entity';

export class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public categoryId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly variants: ProductVariant[] = [],
  ) {}

  addVariant(variant: ProductVariant) {
    this.variants.push(variant);
  }
}
