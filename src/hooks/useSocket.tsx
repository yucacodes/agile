import {
  $,
  noSerialize,
  useSignal,
  type NoSerialize,
} from '@builder.io/qwik'
import type { ClientSocket } from '@presentation'
import { io } from 'socket.io-client'

export const useSocket = (serverPath: string) => {
  let socket: NoSerialize<ClientSocket> = undefined;
  const isOnline : boolean | undefined = false


  /**
   * Creates a socket connection.
   *
   * @return {void} No return value.
   */
  const createSocket = $(() => {

    console.log('createSocket');

    const wsClient: ClientSocket = io(serverPath, {
      transports: ['websocket'],
      protocols: ['websocket'],
    })

    socket = noSerialize(wsClient)

  })

  return {
    socket,
    isOnline,
    createSocket
  }
}
