import {
  $,
  component$,
  useContext,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik'
import {
  type RequestHandler,
  useLocation,
  type DocumentHead,
} from '@builder.io/qwik-city'
import { HasPermission } from '~/components/hasPermission/hasPermission'
import { PlayersTable } from '~/components/players-table/PlayersTable'
import { Points } from '~/components/points/Points'
import { PrimaryButton } from '~/components/primary-button/PrimaryButton'
import { SecondaryButton } from '~/components/secondary-button/SecondaryButton'
import { StateProvider } from '~/context/ProviderContext'
import style from './play-session-page.module.css'
import { useToast } from '~/hooks/useToast'

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
  const { socket, user, idMeeting, secret, isStartedMeeting, votingId } =
    useContext(StateProvider)


  useTask$(({ track, cleanup }) => {
    track(() => socket.value)
    socket.value?.on('ParticipantJoined', (payload) => {
      if (payload.meetingParticipantId) {
        addNotification({
          message: `Se has unido a la sesión ${payload.meetingParticipantName}`,
          status: 'success',
        })
      }
    })

    socket.value?.on('ParticipantDisconnected', (payload) => {
      if (payload.meetingParticipant) {
        addNotification({
          message: `${payload.meetingParticipant.name} ha dejado la sesión`,
          status: 'error',
        })
      }
    })

    socket.value?.on('ManagerStartedVoting', (payload) => {
      votingId.value = payload.votingId
    })

    socket.value?.on('ManagerClosedVoting', (payload) => {
      console.log(payload);
      
    })

    cleanup(() => {
      socket.value?.close()
    })
  })

  const action = $(() => {})

  const shareLink = $(() => {
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
        'ManagerStartedVoting',
        {
          meetingId: idMeeting.value,
        },
        (payload) => {
          isStartedMeeting.value! = true
        }
      )
    }
  })


  const CloseVoting = $(() => {
    if (!idMeeting.value) {
      addNotification({
        message: 'Error al cerrar la votación',
        status: 'error',
      })
    } else {
      socket.value?.emit(
        'ManagerClosedVoting',
        {
        meetingId: idMeeting.value,
        votingId: votingId.value!,
        },
        (payload) => {
          isStartedMeeting.value! = false
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
            <p class={style.time}>00:10:00</p>
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
              <PrimaryButton action={CloseVoting} text="Close VOTES" />
            </HasPermission>
            <HasPermission>
              <PrimaryButton action={action} text="SHOW VOTES" />
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
