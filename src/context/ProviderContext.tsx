import { type AuthInformationDto } from '@application'
import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useStore,
  type NoSerialize,
  type Signal,
} from '@builder.io/qwik'
import type { MeetingClientSocket } from '@presentation'
import { useSocket } from '~/hooks/useSocket'

export interface State {
  user: Signal<AuthInformationDto>
  socket: Signal<NoSerialize<MeetingClientSocket>>
  isOnline: Signal<boolean | undefined>
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const { isOnline, socket } = useSocket('http://localhost:3000')
  const user = useSignal<AuthInformationDto>({} as AuthInformationDto)
  const state = useStore<State>({
    user,
    socket,
    isOnline,
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})
