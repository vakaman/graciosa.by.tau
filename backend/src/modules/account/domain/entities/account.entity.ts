export class Account {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(params: {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
  }): Account {
    const now = new Date();
    return new Account(params.id, params.email, params.passwordHash, params.name, now, now);
  }
}
