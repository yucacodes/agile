import { Authorization } from '@framework/application'
import type { Socket } from 'socket.io'
import type { SocketAuthProvider } from './socket-auth-provider'

export class SocketAuthorization extends Authorization<any> {
  private auth: any

  constructor(
    private authProvider: SocketAuthProvider<any>,
    private socket: Socket
  ) {
    super()
  }

  get() {
    if (!this.auth) {
      this.auth = this.authProvider.getAuth(this.socket)
    }
    return this.auth
  }

  set(auth: any): void {
    this.authProvider.setAuth(this.socket, auth)
  }

  roles(): string[] {
    return this.authProvider.roles(this.get())
  }
}
