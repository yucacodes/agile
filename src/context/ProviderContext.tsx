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
} from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import type { ClientSocket } from '@presentation'
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
  isStartedMeeting: boolean
  votingId: string
  participants: { [key: string]: ParticipantDto }
  votes: Map<string, number>
  startCounter: boolean
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const location = useLocation()

  const socket = noSerialize( new SocketManager())

  const { addNotification } = useToast()

  const shareLink = $(() => {
    // eslint-disable-next-line no-extra-semi
    ;(navigator as any).clipboard.writeText(
      `${
        location.url.protocol + '//' + location.url.host
      }/join-session?secret=${state.secret}&id=${state.idMeeting}`
    )
  })

  const initVoting = $(async () => {
    if (!state.idMeeting) {
      addNotification({
        message: 'Error al iniciar la votación',
        status: 'error',
      })
    } else {
      const response = await state.socket?.emitEvent('StartVoting', {
        meetingId: state.idMeeting!,
      })

      if (response!.success) {
        state.votingId = response.data.id
        state.startCounter = true
        state.isStartedMeeting = true
      }
    }
  })

  const closeVoting = $(async () => {
    if (!state.idMeeting) {
      addNotification({
        message: 'Error al iniciar la votación',
        status: 'error',
      })
    } else {
      const response = await state.socket?.emitEvent('CloseVoting', {
        meetingId: state.idMeeting!,
        votingId: state.votingId!,
      })

      if (response) {
        console.log(response)
        state.startCounter = false
        state.isStartedMeeting = false
      }
    }
  })

  const hanlderParticipantJoind = $((payload: any) => {
    if (payload.participant) {
      state.participants = {
        ...state.participants,
        [payload.participant.userId]: payload.participant,
      }
      addNotification({
        message: `Se has unido a la sesión ${payload.participant.name}`,
        status: 'success',
      })
    }
  })

  const handlerParticipantVoted = $((payload: any) => {
    if (payload.participant) {
      addNotification({
        message: `ha votado ${payload.participant.name}`,
        status: 'success',
      })
    }
  })

  const handlerParticipantDisconnected = $((payload: any) => {
    if (payload.participant) {
      addNotification({
        message: `${payload.participant.name} ha dejado la sesión`,
        status: 'error',
      })
    }
  })

  const hanlderVotingStarted = $((payload: any) => {
    if (payload) {
      state.votingId = payload.votingId
      state.isStartedMeeting = true
      state.startCounter = true

      addNotification({
        message: `La votación ha comenzado`,
        status: 'success',
      })
    }
  })

  const hanlderVotingClosed = $((payload: any) => {
    if (payload) {
      state.votingId = ''
      state.isStartedMeeting = false
      state.startCounter = false

      state.votes = payload.voting.participantVotes

      addNotification({
        message: `La votación ha finalizado`,
        status: 'success',
      })
    }
  })


  const handlerConnect = () => {
    state.isOnline = true
  }

  useVisibleTask$(({ track, cleanup }) => {
    track(() => state.socket)

    state.socket!.onEvent('connect', handlerConnect)

    state.socket!.onEvent('ParticipantJoined', hanlderParticipantJoind)

    state.socket!.onEvent('ParticipantVoted', handlerParticipantVoted)

    state.socket!.onEvent('ParticipantDisconnected', handlerParticipantDisconnected)

    state.socket!.onEvent('VotingStarted', hanlderVotingStarted)

    state.socket!.onEvent('VotingClosed', hanlderVotingClosed)

    cleanup(() => {
      state.socket!.offEvent('ParticipantJoined')

      state.socket!.offEvent('ParticipantVoted')

      state.socket!.offEvent('ParticipantDisconnected')

      state.socket!.offEvent('VotingStarted')

      state.socket!.offEvent('VotingClosed')
    })
  })

  const user = {} as AuthInformation
  const state = useStore<State>({
    user,
    socket,
    isOnline: false,
    secret: '',
    idMeeting: '',
    participants: {},
    isStartedMeeting: false,
    votingId: '',
    votes: new Map<string, number>(),
    startCounter: false,
    initVoting,
    closeVoting,
    shareLink,
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})
