import {
  component$,
  useContextProvider,
  createContextId,
  Slot,
  useStore,
  type NoSerialize,
  type Signal,
} from '@builder.io/qwik'
import type { Socket } from 'socket.io-client'
import { useSocket } from '~/hooks/useSocket'
export interface State {
  user: any
  socket: Signal<NoSerialize<Socket>>
  isOnline: Signal<boolean | undefined>
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const { isOnline, socket } = useSocket('http://localhost:3000')
  const state = useStore<State>({
    user: null,
    socket,
    isOnline,
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})

export const SocketContext = createContextId<State>('socket.context')