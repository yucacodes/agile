import type { ParticipantDto, UserCreateMeetingRequestDto } from '@application'
import {
  $,
  Slot,
  component$,
  createContextId,
  noSerialize,
  useContextProvider,
  useStore,
  useVisibleTask$,
  type NoSerialize,
  type QRL,
} from '@builder.io/qwik'
import { ClientSocket } from '@presentation'
import { io } from 'socket.io-client'
import { getSession, removeSession } from '~/utils/Session'
import { connectSocket } from '~/utils/SocketManager'

interface AuthInformation extends UserCreateMeetingRequestDto {
  name: string
  isManager: boolean
}

export interface State {
  user: AuthInformation
  socket: NoSerialize<ClientSocket>
  isOnline: boolean
  secret: string
  idMeeting: string
  isStartedMeeting: boolean
  votingId: string
  beerTime: number
  participants: { [key: string]: ParticipantDto }
  votes: { [key: string]: number }
  startCounter: boolean
  showVotes: boolean
  emitEvent: QRL<(event: any, data: any) => Promise<any>>
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  let socket: NoSerialize<ClientSocket> = undefined

  const user = {} as AuthInformation

  // const { addNotification } = useToast()

  const emitEvent = $(async function (
    this: State,
    event: any,
    data: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this?.socket?.emit(event, data, (payload: any) => {
        if (!payload.success) {
          reject(payload)
        } else {
          resolve(payload)
        }
      })
    })
  })

  const state = useStore<State>({
    user,
    socket,
    isOnline: false,
    secret: '',
    idMeeting: '',
    participants: {},
    isStartedMeeting: false,
    votingId: '',
    beerTime: new Date().getTime(),
    votes: {},
    startCounter: false,
    emitEvent,
    showVotes: false,
  })

  useVisibleTask$(async ({ track, cleanup }) => {
    track(() => state.socket)
    state.socket?.on('connect', async () => {

      const session = await getSession('session')
      if (session) {
        console.log(session)

        try {
          const res = await state?.emitEvent('RefreshSession', {
            secret: session.secret,
            refreshTokenId: session.sessionData.refreshTokenId,
          })
          state.isOnline = true

        } catch (error) {

        }
      }
    })

    state.socket?.on('disconnect', async () => {
      state.isOnline = false

      await removeSession('session')
    })

    cleanup(() => {
      state.socket?.off('connect')
      state.socket?.off('disconnect')
    })
  })
  useContextProvider(StateProvider, state)

  return <Slot />
})
