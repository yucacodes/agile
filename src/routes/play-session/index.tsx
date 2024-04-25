import {
  $,
  component$,
  useContext,
  useSignal,
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
import { PrimaryButton } from '~/components/primary-button/PrimaryButton'
import { SecondaryButton } from '~/components/secondary-button/SecondaryButton'
import { StateProvider } from '~/context/ProviderContext'
import { useToast } from '~/hooks/useToast'
import style from './play-session-page.module.css'

import { CounterDown } from '@yucacodes/ui-qwik'
import { VotingStartedEventDto } from '@application'
import { SocketResult } from '~/framework/presentation'
import { s } from 'vitest/dist/reporters-5f784f42'

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

  const location = useLocation()

  const hanlderParticipantJoind = $((payload: any) => {
    console.log(payload);

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
    console.log(payload);
    if (payload.participant) {
      state.votes = {
        ...state.votes,
        [payload.participant.userId]: null,
      }
      // addNotification({
      //   message: `ha votado ${payload.participant.name}`,
      //   status: 'success',
      // })
    }
  })

  const handlerParticipantDisconnected = $((payload: any) => {
    console.log(payload);
    if (payload.participant) {
      // addNotification({
      //   message: `${payload.participant.name} ha dejado la sesión`,
      //   status: 'error',
      // })
    }
  })

  const hanlderVotingStarted = $(
    (payload: VotingStartedEventDto) => {
      console.log(payload)
      if (payload) {
        const { voting } = payload
        state.votingId = voting.id
        state.isStartedMeeting = true
        state.startCounter = true
        state.showVotes = false
        state.beerTime = new Date(voting.timeLimit).getTime()
        state.votes = {}
        // addNotification({
        //   message: `La votación ha comenzado`,
        //   status: 'success',
        // })
      }
    }
  )

  const hanlderVotingClosed = $((payload: any) => {
    console.log(payload);
    if (payload) {
      console.log(payload)
      state.votingId = ''
      state.isStartedMeeting = false
      state.showVotes = true
      state.votes = payload.voting.participantVotes
      state.beerTime = 0

      // addNotification({
      //   message: `La votación ha finalizado`,
      //   status: 'success',
      // })
    }
  })

  useVisibleTask$(({ track, cleanup }) => {
    track(() => state.socket)

    state.socket?.on('connect', () => {
      state.isOnline = true
      console.log('connected');

    })

    state.socket?.on('disconnect', () => {
      state.isOnline = true
      console.log('disconnect');

    })

    state.socket?.on('connect_error', () => {
      state.isOnline = true
      console.log('disconnect');

    })

    state.socket?.on('ParticipantJoined', hanlderParticipantJoind)
    state.socket?.on('ParticipantVoted', handlerParticipantVoted)
    state.socket?.on('ParticipantDisconnected', handlerParticipantDisconnected)
    state.socket?.on('VotingStarted', hanlderVotingStarted as any) // TODO: fix types
    state.socket?.on('VotingClosed', hanlderVotingClosed)



    cleanup(() => {
      state.socket?.off('ParticipantJoined')
      state.socket?.off('ParticipantVoted')
      state.socket?.off('ParticipantDisconnected')
      state.socket?.off('VotingStarted')
      state.socket?.off('VotingClosed')

    })
  })

  const action = $(() => {})

  const shareLink = $(() => {
    // eslint-disable-next-line
    ;(navigator as any).clipboard.writeText(
      `${
        location.url.protocol + '//' + location.url.host
      }/join-session?secret=${state.secret}&id=${state.idMeeting}`
    )
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
        state.beerTime = new Date().getTime() + 5* 60 *1000
        state.showVotes = false
        state.votes = {}
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
      state.isStartedMeeting = false
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
            <PrimaryButton action={initVoting} text="START VOTING" />
          </HasPermission>
        )}

        {state.isStartedMeeting && (
          <>
            <HasPermission>
              <PrimaryButton action={closeVoting} text="Cerrar Votacion" />
            </HasPermission>
          </>
        )}
        <HasPermission>
          <SecondaryButton action={shareLink} text="SHARED SESSION" />
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
