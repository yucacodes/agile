import {
  $,
  component$,
  useContext,
  useSignal,
  useTask$,
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
  const location = useLocation()
  const { addNotification } = useToast()
  const {
    socket,
    user,
    idMeeting,
    secret,
    isStartedMeeting,
    votingId,
    participants,
  } = useContext(StateProvider)

  const startCounter = useSignal(false)

  useTask$(({ track, cleanup }) => {
    track(() => socket.value)
    socket.value?.on('ParticipantJoined', (payload) => {
      console.log(payload)
      if (payload.participant) {
        participants.value = [
          ...participants.value,
          {
            ...payload.participant,
          },
        ]
        addNotification({
          message: `Se has unido a la sesión ${payload.participant.name}`,
          status: 'success',
        })
      }
    })

    cleanup(() => {
      socket.value?.removeListener('ParticipantJoined')
    })
  })

  useTask$(({ track, cleanup }) => {
    track(() => socket.value)
    socket.value?.on('ParticipantVoted', (payload) => {
      console.log(payload)
      if (payload.votingId) {
        const participant = participants.value.find(
          (p) => p.userId === payload.participantUserId
        )

        if (!participant) {
          addNotification({
            message: `No se encontro el usuario ${payload.participantUserId}`,
            status: 'error',
          })
        } else {
          addNotification({
            message: `Se has unido a la sesión ${participant.name}`,
            status: 'success',
          })
        }
      }
    })

    cleanup(() => {
      socket.value?.removeListener('ParticipantJoined')
    })
  })

  useTask$(({ track, cleanup }) => {
    track(() => socket.value)
    socket.value?.on('ParticipantDisconnected', (payload) => {
      console.log(payload)

      participants.value = participants.value.filter(
        (p) => p.userId !== payload.meetingParticipant.userId
      )

      addNotification({
        message: `${payload.meetingParticipant.name} ha dejado la sesión`,
        status: 'error',
      })
    })

    cleanup(() => {
      socket.value?.removeListener('ParticipantDisconnected')
    })
  })

  useTask$(({ track, cleanup }) => {
    track(() => socket.value)

    socket.value?.on('VotingStarted', (payload) => {
      console.log(payload)
      console.log('VotingStarted', payload)
      if (payload) {
        votingId!.value = payload.votingId
        startCounter.value = true
        isStartedMeeting!.value = true
      }
    })

    socket.value?.on('VotingClosed', (payload) => {
      console.log(payload)

      if (payload.voting) {
        isStartedMeeting!.value = false
        startCounter.value = false

        Object.keys(payload.voting.participantVotes).forEach((key) => {
          const idx = participants.value.findIndex((p) => p.userId === key)
          if (idx) {
            participants.value[idx].points =
              payload.voting.participantVotes[key]
          }
        })
      }
    })

    cleanup(() => {
      socket.value?.removeListener('VotingStarted')
      socket.value?.removeListener('VotingClosed')
    })
  })

  const action = $(() => {})

  const shareLink = $(() => {
    // eslint-disable-next-line no-extra-semi
    ;(navigator as any).clipboard.writeText(
      `${
        location.url.protocol + '//' + location.url.host
      }/join-session?secret=${secret.value}&id=${idMeeting.value}`
    )
  })

  const InitVoting = $(() => {
    if (!idMeeting.value) {
      addNotification({
        message: 'Error al iniciar la votación',
        status: 'error',
      })
    } else {
      socket.value?.emit(
        'StartVoting',
        {
          meetingId: idMeeting.value!,
        },
        (payload) => {
          console.log(payload)

          if (payload.success) {
            votingId.value = payload.data.id
            startCounter.value = true
            isStartedMeeting.value = true
          }
        }
      )
    }
  })

  const CloseVoting = $(() => {
    if (!idMeeting.value) {
      addNotification({
        message: 'Error al iniciar la votación',
        status: 'error',
      })
    } else {
      socket.value?.emit(
        'CloseVoting',
        {
          meetingId: idMeeting.value!,
          votingId: votingId.value!,
        },
        (payload) => {
          console.log(payload)
          startCounter.value = false
          isStartedMeeting.value = false
        }
      )
    }
  })

  return (
    <main class={style.container}>
      <p class={style.sessionId}>
        Sesion Id: <span class={style.span}> {idMeeting.value} </span>
      </p>
      <div class={style.desktopView}>
        <section class={style.content}>
          <section class={style.header}>
            <p class={style.timeText}>Time</p>
            <CounterDown
              class={style.time}
              clock
              started={startCounter.value}
              beerTime={new Date().getTime() + 1000 * 60 * 60}
            />
            <p class={style.userName}>{user.value.name}</p>
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
        {!isStartedMeeting.value && (
          <HasPermission>
            <PrimaryButton action={InitVoting} text="START VOTING" />
          </HasPermission>
        )}

        {isStartedMeeting?.value && (
          <>
            <HasPermission>
              <PrimaryButton action={CloseVoting} text="Cerrar Votacion" />
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
