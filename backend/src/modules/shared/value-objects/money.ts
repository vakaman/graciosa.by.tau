export class Money {
  private readonly valueInCents: number;

  private constructor(valueInCents: number) {
    if (valueInCents < 0) {
      throw new Error('Money value cannot be negative');
    }
    this.valueInCents = valueInCents;
  }

  static fromDecimal(decimal: number): Money {
    const cents = Math.round(decimal * 100);
    return new Money(cents);
  }

  static fromCents(cents: number): Money {
    return new Money(cents);
  }

  toDecimal(): number {
    return this.valueInCents / 100;
  }

  toCents(): number {
    return this.valueInCents;
  }

  formatToReal(): string {
    const formatted = (this.valueInCents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formatted;
  }
}
