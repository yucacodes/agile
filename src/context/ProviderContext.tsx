import type { MeetingDto, ParticipantDto, VotingDto } from '@application'
import {
  $,
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
  type NoSerialize,
  type QRL,
} from '@builder.io/qwik'
import { ClientSocket } from '@presentation'
import { SocketSuccessResult } from '~/framework/presentation'
import { getSession, removeSession, setSession } from '~/utils/Session'
import { connectSocket } from '~/utils/SocketManager'

export interface State {
  user: ParticipantDto
  socket: NoSerialize<ClientSocket>
  isOnline: boolean
  secret: string
  idMeeting: string
  isStartedMeeting: boolean
  votingId: string
  beerTime: number
  participants: { [key: string]: ParticipantDto }
  votes: { [key: string]: number | null }
  startCounter: boolean
  showVotes: boolean
  emitEvent: QRL<(event: any, data: any) => Promise<any>>
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const socket: NoSerialize<ClientSocket> = undefined

  const user = {} as ParticipantDto

  const emitEvent = $(async function (
    this: State,
    event: any,
    data: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this?.socket?.emit(event, data, (payload: any) => {
        console.log(event, data)

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

  const reconnect = $(async (session: any) => {
    state.socket = await connectSocket()

    const res = await state.emitEvent('RefreshSession', {
      secret: session.sessionData.refreshTokenSecret,
      refreshTokenId: session.sessionData.refreshTokenId,
    })

    console.log(res.data)

    setSession({
      nameItem: 'session',
      value: {
        name: session.name,
        isManager: session.isManager,
        secret: session.secret,
        idMeeting: session.idMeeting,
        sessionData: res.data,
      },
    })

    const response: SocketSuccessResult<MeetingDto> = await state.emitEvent(
      'ReconectToMeeting',
      {
        id: session.sessionData.userId,
        meetingId: session.idMeeting,
      }
    )

    const meeting = response.data

    console.log(meeting)
    console.log(session.sessionData)

    state.participants = meeting.participants
    state.user = meeting.participants[session.sessionData.userId]
    state.idMeeting = meeting.id

    const lastVoting = Object.values(response.data.votings)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .at(0)

    if (lastVoting) {
      state.votes = lastVoting.participantVotes
      state.votingId = lastVoting.id
      state.isStartedMeeting = !lastVoting.isClosed
      state.showVotes = lastVoting.isClosed
    }
  })

  useVisibleTask$(async ({ track, cleanup }) => {
    const session = await getSession('session')

    const socket = track(() => state.socket)
    if (!socket) return

    const connectListener = async () => {
      // TODO: hay que determinar si la conexion fue una normal o una reconeccion
      // if (session) {
      //   await reconnect(session)
      // }
    }
    socket.on('connect', connectListener)

    console.log(session)
    if (session) {
      await reconnect(session)
    }

    cleanup(() => {
      socket.removeListener('connect', connectListener)
    })
  })
  useContextProvider(StateProvider, state)

  return <Slot />
})
