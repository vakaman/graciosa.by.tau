import { ProductAttribute } from '@/modules/product/domain/entities/product/product-attribute.entity';

export class ProductVariantAttributeValue {
  private readonly id: number;
  private productVariantId: number;
  private attributeId: number;
  private stringValue?: string;
  private numberValue?: number;
  private booleanValue?: boolean;
  private dateValue?: Date;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;
  private attribute?: ProductAttribute;

  constructor(params: {
    id?: number;
    productVariantId?: number;
    attributeId: number;
    stringValue?: string;
    numberValue?: number;
    booleanValue?: boolean;
    dateValue?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    attribute?: ProductAttribute;
  }) {
    this.id = params.id ?? 0;
    this.productVariantId = params.productVariantId ?? 0;
    this.attributeId = params.attributeId;
    this.stringValue = params.stringValue;
    this.numberValue = params.numberValue;
    this.booleanValue = params.booleanValue;
    this.dateValue = params.dateValue;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt ?? new Date();
    this.attribute = params.attribute;
  }

  public getAttributeId(): number {
    return this.attributeId;
  }

  public getAttribute(): ProductAttribute | undefined {
    return this.attribute;
  }

  getTypedValue(): string | number | boolean | Date | null {
    return (
      this.stringValue ??
      this.numberValue ??
      this.booleanValue ??
      this.dateValue ??
      null
    );
  }
}
