import { socketAuthProvider } from '@yucacodes/es'
import type { Socket } from 'socket.io'
import type { AuthInformationDto } from '../application/dtos'

@socketAuthProvider()
export class SocketAuthProvider {
  getAuth(socket: Socket): AuthInformationDto | null {
    return socket.data.auth ?? null
  }

  setAuth(socket: Socket, auth: AuthInformationDto) {
    socket.data.auth = auth
  }

  roles(auth: AuthInformationDto) {
    return auth.roles
  }
}
