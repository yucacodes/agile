export class Authorization<Auth> {
  constructor(
    private getAction: () => Auth,
    private setAction: (auth: Auth) => void
  ) {}

  get(): Auth {
    return this.getAction()
  }

  set(auth: Auth) {
    this.setAction(auth)
  }
}
