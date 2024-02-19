import { Authorization } from '@framework/application'
import type { SocketAuthProvider } from './auth-provider'

export class SocketAuthorization extends Authorization<any> {
  constructor(private authProvider: SocketAuthProvider<any>) {
    super()
  }

  get() {
    throw new Error('Method not implemented.')
  }
  set(auth: any): void {
    throw new Error('Method not implemented.')
  }
  roles(): string[] {
    throw new Error('Method not implemented.')
  }
}
