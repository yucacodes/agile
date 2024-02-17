export class Authorization<Auth> {
  constructor(
    private auth: Auth | null,
    private _roles_: string[] | null,
    private setAuth: (auth: Auth) => void
  ) {}

  get(): Auth {
    if (!this.auth) throw new Error(`Invalid authorization`)
    return this.auth
  }

  set(auth: Auth) {
    this.setAuth(auth)
  }

  roles(): string[] {
    if (!this._roles_) throw new Error(`Invalid authorization`)
    return this._roles_
  }
}
