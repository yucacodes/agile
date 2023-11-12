import { useComputed$, useSignal } from '@builder.io/qwik'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', { transports: ['websocket'] })

const useSocket = (nameEvent: string) => {
  const isConnect = useSignal<boolean>(false)
  const events = useSignal<Record<string, any>[]>([])

  useComputed$(() => {
    socket.on('connect', () => {
      isConnect.value = true
      console.log('connect')
    })

    socket.on('disconnect', () => {
      isConnect.value = false
      console.log('disconnect')
    })

    socket.on(nameEvent, (data) => {
      console.log('data', data)
      events.value = [...events.value, data]
    })
  })

  return { events, isConnect }
}

export { useSocket }
