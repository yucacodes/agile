import { $, component$, useContext, useSignal } from '@builder.io/qwik'
import {
  routeLoader$,
  useNavigate,
  type DocumentHead,
} from '@builder.io/qwik-city'
import style from './join-session-page.module.css'

import { LinkButton } from '~/components/link-button/LinkButton'
import { Title } from '~/components/title/Title'
import { StateProvider } from '~/context/ProviderContext'
import { useToast } from '~/hooks/useToast'

export const useJoinPokerSession = routeLoader$(async ({ url }) => {
  const secret = url.searchParams.get('secret')
  const id = url.searchParams.get('id')
  return {
    secret,
    id,
  }
})

export default component$(() => {
  const { addNotification } = useToast()
  const state = useContext(StateProvider)

  const QueryParams = useJoinPokerSession()

  const name = useSignal('')

  const nav = useNavigate()

  const action = $(async () => {

    state.socket!.createSocket()

    if (QueryParams?.value?.id && QueryParams?.value?.secret) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      state.socket?.emit(
        'JoinMeeting',
        {
          name: name.value,
          secret: QueryParams.value.secret,
          meetingId: QueryParams.value.id,
        },
        (response) => {
          console.log(response)

          if (!response.success) {
            return
          }

          state.participants = response.data.meeting.participants
          state.secret = response.data.secret
          state.idMeeting = response.data.meeting.id
          const isManager =
            response.data.meeting.participants[response.data.authInfo.userId]
              .isManager

          state.user = {
            ...response.data.authInfo,
            name: name.value,
            isManager,
          }

          addNotification({
            message: 'Te has unido a la sesión',
            status: 'success',
          })

          nav(`/play-session?secret=${QueryParams?.value?.secret}&id=${state.idMeeting}`)
        }
      )
    } else {

      await new Promise((resolve) => setTimeout(resolve, 100))
      state.socket?.emit(
        'StartMeeting',
        {
          name: name.value,
        },
        (response) => {
          console.log(response)
          if (!response.success) {
            return
          }

          

          state.participants = response.data.meeting.participants

          state.secret = response.data.secret
          state.idMeeting = response.data.meeting.id
          const isManager =
            response.data.meeting.participants[response.data.authInfo.userId]
              .isManager

          state.user = {
            ...response.data.authInfo,
            name: name.value,
            isManager,
          }
          addNotification({
            message: 'Has creado una sesión exitosamente',
            status: 'success',
          })

          nav(`/play-session?secret=${state.secret}&id=${state.idMeeting}`)
        }
      )
    }
  })
  return (
    <>
      <div class={style.content}>
        <Title text="Create Session" />
        <section class={style.form}>
          <input
            onChange$={(event) => {
              name.value = event.target.value
            }}
            type="text"
            class={style.input}
            placeholder="Session name"
          />
          <LinkButton
            action={action}
            text={QueryParams.value.id ? 'Join a session' : 'Create a session'}
          />
        </section>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'create Session',
  meta: [
    {
      name: 'description',
      content: 'crate session page description',
    },
  ],
}
