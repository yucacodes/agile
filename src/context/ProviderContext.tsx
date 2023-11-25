import {
  component$,
  useContextProvider,
  createContextId,
  Slot,
  useStore,
  type NoSerialize,
  type Signal,
  useSignal,
} from '@builder.io/qwik'
import type { Socket } from 'socket.io-client'
import { useSocket } from '~/hooks/useSocket'
import type { ApiEmmitedEventsMap, ApiListenEventsMap } from '@presentation'
import type { MeetingAuthInformationDto } from '@application'

export type ClientSocket = Socket<ApiEmmitedEventsMap, ApiListenEventsMap>
export interface State {
  user: Signal<MeetingAuthInformationDto>
  socket: Signal<NoSerialize<ClientSocket>>
  isOnline: Signal<boolean | undefined>
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const { isOnline, socket } = useSocket('http://localhost:3000')
  const user = useSignal<MeetingAuthInformationDto>(
    {} as MeetingAuthInformationDto
  )
  const state = useStore<State>({
    user,
    socket,
    isOnline,
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})
