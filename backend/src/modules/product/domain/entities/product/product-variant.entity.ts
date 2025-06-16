import { ProductVariantAttributeValue } from '@/modules/product/domain/entities/product/product-variant-attribute-value.entity';

export class ProductVariant {
  private readonly id: number;
  private sku: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private readonly attributes: ProductVariantAttributeValue[];

  constructor(params: {
    id?: number;
    sku: string;
    attributes?: ProductVariantAttributeValue[];
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id ?? 0;
    this.sku = params.sku;
    this.attributes = params.attributes ?? [];
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt ?? new Date();
  }

  getAttributes(): ProductVariantAttributeValue[] {
    return this.attributes;
  }

  getAttributeValueById(attributeId: number): any {
    const attr = this.attributes.find(
      (a) => a.getAttributeId() === attributeId,
    );
    return attr ? attr.getTypedValue() : null;
  }

  getAttributeValueByName(attributeName: string): any {
    const attr = this.attributes.find(
      (a) => a.getAttribute()?.name === attributeName,
    );
    return attr ? attr.getTypedValue() : null;
  }

  addAttributes(attributes: ProductVariantAttributeValue[]) {
    this.attributes.push(...attributes);
  }
}
