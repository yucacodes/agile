import type { UserCreateMeetingRequestDto, MeetingParticipantDto } from '@application'
import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useStore,
  type NoSerialize,
  type Signal,
  type QRL,
} from '@builder.io/qwik'
import { MeetingParticipant } from '@domain'
import type { MeetingClientSocket } from '@presentation'
import { useSocket } from '~/hooks/useSocket'

interface AuthInformation extends UserCreateMeetingRequestDto {
  name: string
  isManager: boolean
}



export interface State {
  user: Signal<AuthInformation>
  socket: Signal<NoSerialize<MeetingClientSocket>>
  isOnline: Signal<boolean | undefined>
  secret: Signal<string | undefined>
  idMeeting: Signal<string | undefined>
  createSocket:  QRL<() => void> 
  participants: Signal<MeetingParticipantDto[]>
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const { isOnline, socket, createSocket } = useSocket('http://localhost:3000')
  const user = useSignal<AuthInformation>({} as AuthInformation)
  const state = useStore<State>({
    user,
    socket,
    isOnline,
    secret: useSignal<string | undefined>(undefined),
    idMeeting: useSignal<string | undefined>(undefined),
    createSocket,
    participants :  useSignal<MeetingParticipantDto[]>([]),
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})
