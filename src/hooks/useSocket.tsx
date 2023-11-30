import {
  noSerialize,
  useSignal,
  useTask$,
  useVisibleTask$,
  type NoSerialize,
} from '@builder.io/qwik'

import { io } from 'socket.io-client'
import type { ClientSocket } from '~/context/ProviderContext'

const useSocket = (serverPath: string) => {
  const socket = useSignal<NoSerialize<ClientSocket>>(undefined)
  const isOnline = useSignal<boolean | undefined>(false)

  // this need to be initialized on the client only
  useVisibleTask$(({ cleanup }) => {
    const wsClient: ClientSocket = io(serverPath, {
      transports: ['websocket'],
      protocols: ['websocket'],
    })

    socket.value = noSerialize(wsClient)

    cleanup(() => {
      wsClient.close()
    })
  })

  useTask$(({ track }) => {
    track(() => socket.value)
    socket.value?.on('connect', () => {
      isOnline.value = socket.value?.connected
    })
  })

  useTask$(({ track }) => {
    track(() => socket.value)
    socket.value?.on('disconnect', () => {
      isOnline.value = socket.value?.connected
    })
  })

  return {
    socket,
    isOnline,
  }
}

export { useSocket }
