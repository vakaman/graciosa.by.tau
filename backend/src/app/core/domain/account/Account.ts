export class Account {
  private readonly _id: string
  private _email: string
  private _passwordHash?: string
  private _googleId?: string
  private _name: string
  private readonly _createdAt: Date
  private _updatedAt: Date

  constructor(params: {
    id: string
    email: string
    name: string
    passwordHash?: string
    googleId?: string
    createdAt?: Date
    updatedAt?: Date
  }) {
    this._id = params.id
    this._email = params.email
    this._name = params.name
    this._passwordHash = params.passwordHash
    this._googleId = params.googleId
    this._createdAt = params.createdAt ?? new Date()
    this._updatedAt = params.updatedAt ?? new Date()
  }

  get id() { return this._id }
  get email() { return this._email }
  get name() { return this._name }
  get passwordHash() { return this._passwordHash }
  get googleId() { return this._googleId }
  get createdAt() { return this._createdAt }
  get updatedAt() { return this._updatedAt }

  public changeName(newName: string) {
    if (!newName || newName.trim().length === 0) {
      throw new Error("Nome inválido")
    }
    this._name = newName
    this.touch()
  }

  public setPasswordHash(newHash: string) {
    this._passwordHash = newHash
    this.touch()
  }

  public setGoogleId(googleId: string) {
    this._googleId = googleId
    this.touch()
  }

  private touch() {
    this._updatedAt = new Date()
  }
}
