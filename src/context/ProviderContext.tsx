import type { MeetingDto, ParticipantDto, UserCreateMeetingRequestDto } from '@application'
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
import { SocketResult, SocketSuccessResult } from '~/framework/presentation'
import { getSession, removeSession, setSession } from '~/utils/Session'
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
  const socket: NoSerialize<ClientSocket> = undefined

  const user = {} as AuthInformation

  const emitEvent = $(async function (
    this: State,
    event: any,
    data: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this?.socket?.emit(event, data, (payload: any) => { 
        console.log(event, data);

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
    track(() => getSession('session'))

    const session = await getSession('session')

    if (session) {
      console.log(session);

      state.socket = await connectSocket();

      const res = await state?.emitEvent('RefreshSession', {
        secret: session.sessionData.refreshTokenSecret,
        refreshTokenId: session.sessionData.refreshTokenId,
      })

      console.log(res.data);


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

      const meeting: SocketSuccessResult<MeetingDto> = await state?.emitEvent('GetMeeting', {
        id: session.sessionData.userId,
        meetingId: session.idMeeting,
      })

      console.log(meeting.data);
      console.log(session.sessionData);


      state.participants = meeting.data.participants
      const user = meeting.data.participants[session.sessionData.userId]

      state.user = user


      state.idMeeting = session.idMeeting

      // add voting 
      for (const [key, value] of Object.entries(meeting.data.votings)) {
        state.votes[key] = Number(value)
      }
    }



    state.socket?.on('disconnect', async () => {
      state.isOnline = false

      await removeSession('session')
    })

    cleanup(() => {
      state.socket?.off('disconnect')
    })
  })
  useContextProvider(StateProvider, state)

  return <Slot />
})
