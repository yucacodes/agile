import {
  type NoSerialize,
  noSerialize,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik'
import { type Socket, io } from 'socket.io-client'

const useSocket = (serverPath: string) => {
  const socket = useSignal<NoSerialize<Socket>>(undefined)

  // this need to be initialized on the client only
  useVisibleTask$(({ cleanup }) => {
    const wsClient = io(serverPath)
    socket.value = noSerialize(wsClient)

    cleanup(() => {
      wsClient.close()
    })
  })

  const isOnline = useSignal<boolean | undefined>(false)

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
