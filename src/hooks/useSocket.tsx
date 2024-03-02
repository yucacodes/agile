import {
  $,
  noSerialize,
  useSignal,
  type NoSerialize,
  useVisibleTask$
} from '@builder.io/qwik'
import type { ClientSocket } from '@presentation'
import { io } from 'socket.io-client'

export const useSocket = (serverPath: string) => {
  const socket = useSignal<NoSerialize<ClientSocket>>(undefined)
  const isOnline = useSignal<boolean | undefined>(false)


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

    socket.value = noSerialize(wsClient)

  })

  return {
    socket,
    isOnline,
    createSocket
  }
}
