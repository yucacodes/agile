import { $, component$, useContext, useSignal } from '@builder.io/qwik'
import style from './create-session-page.module.css'
import {
  type DocumentHead,
  routeLoader$,
  useNavigate,
} from '@builder.io/qwik-city'

import { StateProvider } from '~/context/ProviderContext'
import { Title } from '~/components/title/Title'
import { LinkButton } from '~/components/link-button/LinkButton'

export const useJoinPokerSession = routeLoader$(async ({ url }) => {
  const secret = url.searchParams.get('secret')
  const id = url.searchParams.get('id')
  return {
    secret,
    id,
  }
})

export default component$(() => {
  const { socket, user, idMeeting, secret } = useContext(StateProvider)

  const QueryParams = useJoinPokerSession()

  const name = useSignal('')

  const nav = useNavigate()
  const action = $(() => {
    if (QueryParams.value.id && QueryParams.value.secret) {
      socket.value?.emit(
        'JoinMeeting',
        {
          name: name.value,
          secret: QueryParams.value.secret,
          meetingId: QueryParams.value.id,
        },
        (response) => {
          console.log('🚀 ~ file: index.tsx:40 ~ action ~ response:', response)
          if (!response.success) {
            return
          }
          secret.value = response.data.secret
          idMeeting.value = response.data.meeting.id
          user.value = { ...response.data.authInfo, name: name.value }
          nav('/play-session')
        }
      )

      return
    }

    socket.value?.emit(
      'StartMeeting',
      {
        name: name.value,
      },
      (response) => {
        console.log('🚀 ~ file: index.tsx:60 ~ action ~ response:', response)
        if (!response.success) {
          return
        }

        secret.value = response.data.secret
        idMeeting.value = response.data.meeting.id
        user.value = { ...response.data.authInfo, name: name.value }
        nav('/play-session')
      }
    )
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
