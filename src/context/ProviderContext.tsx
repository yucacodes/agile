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


interface AuthInformation extends AuthInformationDto {
  name: string
}

export interface State {
  user: Signal<AuthInformation>
  socket: Signal<NoSerialize<MeetingClientSocket>>
  isOnline: Signal<boolean | undefined>
  secret: Signal<string | undefined>
  idMeeting: Signal<string | undefined>
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const { isOnline, socket } = useSocket('http://localhost:3000')
  const user = useSignal<AuthInformation>({} as AuthInformation)
  const state = useStore<State>({
    user,
    socket,
    isOnline,
    secret: useSignal<string | undefined>(undefined),
    idMeeting: useSignal<string | undefined>(undefined),
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})
