import { Money } from '@/modules/shared/value-objects/money';

export class ProductVariant {
  constructor(
    public readonly id: number,
    public color: string,
    public size: string,
    public price: Money,
    public sku: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
