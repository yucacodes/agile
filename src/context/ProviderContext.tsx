import type { ParticipantDto, UserCreateMeetingRequestDto } from '@application'
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
  noSerialize,
  useSignal,
  Signal,
} from '@builder.io/qwik'
import { useLocation, useNavigate } from '@builder.io/qwik-city'
import { ClientSocket } from '@presentation'
import { io } from 'socket.io-client'
import { useSocket } from '~/hooks/useSocket'

import { useToast } from '~/hooks/useToast'
import { SocketManager } from '~/utils/SocketManager'

interface AuthInformation extends UserCreateMeetingRequestDto {
  name: string
  isManager: boolean
}

export interface State {
  user: AuthInformation
  socket: NoSerialize<SocketManager>
  isOnline: boolean
  secret: string
  idMeeting: string
  initVoting: QRL<() => void>
  closeVoting: QRL<() => void>
  shareLink: QRL<() => void>
  handleVote: QRL<(point: number) => void>
  isStartedMeeting: boolean
  votingId: string
  participants: { [key: string]: ParticipantDto }
  votes: { [key: string]: number }
  startCounter: boolean
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const socketManager = noSerialize(new SocketManager())

  const location = useLocation()
  const nav = useNavigate()

  // const socket = useSignal<NoSerialize<ClientSocket>>(undefined)

  const user = {} as AuthInformation

  // const { addNotification } = useToast()

  const hanlderParticipantJoind = $((payload: any) => {
    if (payload.participant) {
      state.participants = {
        ...state.participants,
        [payload.participant.userId]: payload.participant,
      }
      // addNotification({
      //   message: `Se has unido a la sesión ${payload.participant.name}`,
      //   status: 'success',
      // })
    }
  })

  const handlerParticipantVoted = $((payload: any) => {
    if (payload.participant) {
      // addNotification({
      //   message: `ha votado ${payload.participant.name}`,
      //   status: 'success',
      // })
    }
  })

  const handlerParticipantDisconnected = $((payload: any) => {
    if (payload.participant) {
      // addNotification({
      //   message: `${payload.participant.name} ha dejado la sesión`,
      //   status: 'error',
      // })
    }
  })

  const hanlderVotingStarted = $((payload: any) => {
    if (payload) {
      state.votingId = payload.votingId
      state.isStartedMeeting = true
      state.startCounter = true

      // addNotification({
      //   message: `La votación ha comenzado`,
      //   status: 'success',
      // })
    }
  })

  const hanlderVotingClosed = $((payload: any) => {
    if (payload) {
      state.votingId = ''
      state.isStartedMeeting = false
      state.startCounter = false

      state.votes = payload.voting.participantVotes

      // addNotification({
      //   message: `La votación ha finalizado`,
      //   status: 'success',
      // })
    }
  })

  useVisibleTask$(({ track, cleanup }) => {
    track(() => socketManager)

    socketManager!.onEvent('ParticipantJoined', hanlderParticipantJoind)
    socketManager!.onEvent('ParticipantVoted', handlerParticipantVoted)
    socketManager!.onEvent('ParticipantDisconnected', handlerParticipantDisconnected)
    socketManager!.onEvent('VotingStarted', hanlderVotingStarted)
    socketManager!.onEvent('VotingClosed', hanlderVotingClosed)

    cleanup(() => {
      socketManager!.offEvent('ParticipantJoined')
      socketManager!.offEvent('ParticipantVoted')
      socketManager!.offEvent('ParticipantDisconnected')
      socketManager!.offEvent('VotingStarted')
      socketManager!.offEvent('VotingClosed')
    })
  })

  const state = useStore<State>({
    user,
    socket: socketManager,
    isOnline: false,
    secret: '',
    idMeeting: '',
    participants: {},
    isStartedMeeting: false,
    votingId: '',
    votes: {},
    startCounter: false,

    initVoting: $(async function (this: State) {
      const res = await socketManager?.emitEvent('StartVoting', {
        meetingId: this.idMeeting!,
      })

      if (res!.success) {
        this.votingId = res.data.id
        this.startCounter = true
        this.isStartedMeeting = true
      }
    }),

    closeVoting: $(async function (this: State) {
      const res = await socketManager?.emitEvent('CloseVoting', {
        meetingId: this.idMeeting!,
        votingId: this.votingId!,
      })

      if (res.success) {
        console.log(res)
        this.startCounter = false
        this.isStartedMeeting = false
      }
    }),

    shareLink: $(function (this: State) {
      // eslint-disable-next-line no-extra-semi
      ;(navigator as any).clipboard.writeText(
        `${
          location.url.protocol + '//' + location.url.host
        }/join-session?secret=${this.secret}&id=${this.idMeeting}`
      )
    }),

    handleVote: $(async function (this: State, point: number) {
      const res = await socketManager?.emitEvent('Vote', {
        meetingId: this.idMeeting!,
        point,
        votingId: this.votingId!,
      })
      if (res.success) {
        console.log(res)

        this.votes = res.data.participantVotes
      }
    }),
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})
