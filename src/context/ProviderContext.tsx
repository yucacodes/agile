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
  type QRL
} from '@builder.io/qwik'
import { ClientSocket } from '@presentation'
import { io } from 'socket.io-client'
import { getSession, removeSession } from '~/utils/Session'

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
  connect: QRL<() => Promise<void>>
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

  const connect = $(async function (this: State): Promise<void> {
    return new Promise((resolve, _) => {
      this.socket = noSerialize(
        io(import.meta.env.PUBLIC_API_URL, {
          transports: ['websocket'],
          protocols: ['websocket'],

        })
      )
      void resolve()
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
    connect,
    emitEvent,
    showVotes: false,

  })



  useVisibleTask$(async ({ track, cleanup }) => {
    track(() => state.socket)

    console.log('state.socket', state.socket);


    state.socket?.on('connect', async () => {
      state.isOnline = true
      console.log('connected');
      const session = await getSession('session')
      if (session) {
        console.log(session);

        try {
          const res = await state?.emitEvent('RefreshSession', {
            secret: session.secret,
            refreshTokenId: session.sessionData.refreshTokenId,
          })

          console.log('----', res);
        } catch (error) {
          console.log('error', error);

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
