export class ProductAttribute {
  public readonly id: number;
  public name: string;
  public type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM' | 'DATE';
  public unit?: string;
  public isRequired: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(params: {
    id?: number;
    name: string;
    type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'ENUM' | 'DATE';
    unit?: string;
    isRequired?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id ?? 0;
    this.name = params.name;
    this.type = params.type;
    this.unit = params.unit;
    this.isRequired = params.isRequired ?? false;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt ?? new Date();
  }
}
