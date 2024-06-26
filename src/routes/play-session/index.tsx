import {
  $,
  component$,
  useContext,
  useVisibleTask$,
} from '@builder.io/qwik'
import {
  useLocation,
  type DocumentHead,
  type RequestHandler,
} from '@builder.io/qwik-city'
import { HasPermission } from '~/components/hasPermission/hasPermission'
import { PlayersTable } from '~/components/players-table/PlayersTable'
import { Points } from '~/components/points/Points'
import { StateProvider } from '~/context/ProviderContext'
import style from './play-session-page.module.css'

import { CounterDown, useSnackBar } from '@yucacodes/ui-qwik'
import { VotingStartedEventDto } from '@application'

import { Button } from '@yucacodes/ui-qwik'

export const onRequest: RequestHandler = async ({ next, url, redirect }) => {
  const secret = url.searchParams.get('secret')
  const id = url.searchParams.get('id')

  if (secret && id) {
    await next()
  } else {
    redirect(302, '/')
  }
}

export default component$(() => {
  const state = useContext(StateProvider)
  const { addSnackBar } = useSnackBar()

  const location = useLocation()

  const hanlderParticipantJoind = $((payload: any) => {
    console.log(payload);

    if (payload.participant) {
      state.participants = {
        ...state.participants,
        [payload.participant.userId]: payload.participant,
      }

      addSnackBar({
        message: `Se ha unido a la sesión ${payload.participant.name}`,
      })
    }
  })

  const handlerParticipantVoted = $((payload: any) => {
    console.log(payload);
    if (payload.participant) {
      state.votes = {
        ...state.votes,
        [payload.participant.userId]: null,
      }

      addSnackBar({
        message: `ha votado ${payload.participant.name}`,
      })
    }
  })

  const handlerParticipantDisconnected = $((payload: any) => {
    console.log(payload);
    if (payload.participant) {
      addSnackBar({
        message: `${payload.participant.name} ha dejado la sesión`,
      })
    }
  })

  const hanlderVotingStarted = $((payload: VotingStartedEventDto) => {
    console.log(payload)
    if (payload) {
      const { voting } = payload
      state.votingId = voting.id
      state.isStartedMeeting = true
      state.startCounter = true
      state.showVotes = false
      state.beerTime = new Date(voting.timeLimit).getTime()
      state.votes = {}

      addSnackBar({
        message: `La votación ha comenzado`,
      })
    }
  })

  const hanlderVotingClosed = $((payload: any) => {
    console.log(payload);
    if (payload) {
      console.log(payload)
      state.votingId = ''
      state.isStartedMeeting = false
      state.showVotes = true
      state.votes = payload.voting.participantVotes
      state.beerTime = 0

      addSnackBar({
        message: `La votación ha finalizado`,
      })
    }
  })

  useVisibleTask$(({ track, cleanup }) => {
    const socket = track(() => state.socket)
    if(!socket) return

    socket.on('ParticipantJoined', hanlderParticipantJoind)
    socket.on('ParticipantVoted', handlerParticipantVoted)
    socket.on('ParticipantDisconnected', handlerParticipantDisconnected)
    socket.on('VotingStarted', hanlderVotingStarted as any) // TODO: fix types
    socket.on('VotingClosed', hanlderVotingClosed)

    socket.on('disconnect', () => {
      addSnackBar({
        message: `Se ha perdido la conexión`,
      })
    }
    )

    cleanup(() => {
      socket.off('ParticipantJoined')
      socket.off('ParticipantVoted')
      socket.off('ParticipantDisconnected')
      socket.off('VotingStarted')
      socket.off('VotingClosed')
      socket.off('disconnect')
    })
  })

  const shareLink = $(() => {
    // eslint-disable-next-line
    ;(navigator as any).clipboard.writeText(
      `${
        location.url.protocol + '//' + location.url.host
      }/join-session?secret=${state.secret}&id=${state.idMeeting}`
    )

    addSnackBar({
      message: `Link copiado al portapapeles`,
    })
  })

  const initVoting = $(async () => {
    try {
      const res = await state.emitEvent('StartVoting', {
        meetingId: state.idMeeting!,
      })

      console.log(res)

      if (res!.success) {
        state.votingId = res.data.id
        state.startCounter = true
        state.isStartedMeeting = true
        state.beerTime = new Date().getTime() + 5 * 60 * 1000
        state.showVotes = false
        state.votes = {}

        addSnackBar({
          message: `Se ha iniciado la votación`,
        })

      }
    } catch (error) {
      console.log(error)
    }
  })

  const closeVoting = $(async () => {
    const res = await state.emitEvent('CloseVoting', {
      meetingId: state.idMeeting!,
      votingId: state.votingId!,
    })
    if (res.success) {
      state.startCounter = false
      // state.isStartedMeeting = false


    }
  })

  return (
    <main class={style.container}>
      <p class={style.sessionId}>
        Sesion Id: <span class={style.span}> {state.idMeeting} </span>
      </p>
      <div class={style.desktopView}>
        <section class={style.content}>
          <section class={style.header}>
            <p class={style.timeText}>Time</p>
            <CounterDown
              class={style.time}
              clock
              started={state.startCounter}
              beerTime={state.beerTime}
            />
            <p class={style.userName}>{state.user.name}</p>
          </section>

          <input
            type="text"
            placeholder="Story description"
            class={style.input}
          />

          <section class={style.tableInMobile}>
            <PlayersTable />
          </section>

          <Points />
        </section>
        <section class={style.tableInDesktop}>
          <PlayersTable />
        </section>
      </div>

      <section class={style.buttonsContainer}>
        {!state.isStartedMeeting && (
          <HasPermission>
            <Button onClick$={initVoting} >
              Iniciar Votacion
            </Button>
          </HasPermission>
        )}

        {state.isStartedMeeting && (
          <>
            <HasPermission>
              <Button secondary onClick$={closeVoting} >
                Cerrar Votacion
              </Button>
            </HasPermission>
          </>
        )}
        <HasPermission>
          <Button outlined onClick$={shareLink} >
            Share Session
          </Button>
        </HasPermission>
      </section>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'Play Session',
  meta: [
    {
      name: 'description',
      content: 'Play session page description',
    },
  ],
}
