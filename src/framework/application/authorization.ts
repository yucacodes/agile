export class Authorization<Auth> {
  allowed(): boolean {
    return false
  }

  get(): Auth {
    return null as any
  }

  set(auth: Auth) {
    console.log(auth)
  }
}
