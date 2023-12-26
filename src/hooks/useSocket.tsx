import {
  $,
  noSerialize,
  useSignal,
  useTask$,
  type NoSerialize
} from '@builder.io/qwik'
import type { MeetingClientSocket } from '@presentation'
import { io } from 'socket.io-client'

export const useSocket = (serverPath: string) => {
  const socket = useSignal<NoSerialize<MeetingClientSocket>>(undefined)
  const isOnline = useSignal<boolean | undefined>(false)


  /**
   * Creates a socket connection.
   *
   * @return {void} No return value.
   */
  const createSocket = $(() => {
    const wsClient: MeetingClientSocket = io(serverPath, {
      transports: ['websocket'],
      protocols: ['websocket'],
    })

    socket.value = noSerialize(wsClient)

  })


  useTask$(({ track }) => {
    track(() => socket.value)
    socket.value?.on('connect', () => {
      isOnline.value = socket.value?.connected
    })
  })

  useTask$(({ track, cleanup }) => {
    track(() => socket.value)
    socket.value?.on('disconnect', () => {
      isOnline.value = socket.value?.disconnected
    })

    cleanup(() => {
      socket.value?.close()
    })
  })

  return {
    socket,
    isOnline,
    createSocket
  }
}
