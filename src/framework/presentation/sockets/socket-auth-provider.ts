import { type Socket } from 'socket.io'

export type SocketAuthProvider<Auth> = {
  getAuth(socket: Socket): Auth | null
  setAuth(socket: Socket, auth: Auth): void
  roles(auth: Auth): string[]
}
