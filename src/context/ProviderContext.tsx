import type { ParticipantDto, UserCreateMeetingRequestDto } from '@application'
import {
  $,
  Slot,
  component$,
  createContextId,
  noSerialize,
  useContextProvider,
  useStore,
  type NoSerialize,
  type QRL,
} from '@builder.io/qwik'
import { ClientSocket } from '@presentation'
import { io } from 'socket.io-client'

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
  RegisterEvent: QRL<
    (event: any, callBack: QRL<(payload: any) => void>) => void
  >
  offEvent: QRL<(event: any) => void>
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
        io('http://localhost:3000', {
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
    RegisterEvent: $(async function (
      this: State,
      event: any,
      callBack: (payload: any) => void
    ) {
      this.socket!.on(event, callBack)
    }),
    offEvent: $(async function (this: State, event: any) {
      this.socket!.off(event)
    }),
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})
