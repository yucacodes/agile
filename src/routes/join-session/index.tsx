import { $, component$, useContext, useSignal } from '@builder.io/qwik'
import {
  routeLoader$,
  useNavigate,
  type DocumentHead,
} from '@builder.io/qwik-city'
import style from './join-session-page.module.css'

import { Button, useSnackBar } from '@yucacodes/ui-qwik'
import { Title } from '~/components/title/Title'
import { StateProvider } from '~/context/ProviderContext'

export const useJoinPokerSession = routeLoader$(async ({ url }) => {
  const secret = url.searchParams.get('secret')
  const id = url.searchParams.get('id')
  return {
    secret,
    id,
  }
})

export default component$(() => {
  const state = useContext(StateProvider)
  const QueryParams = useJoinPokerSession()
  const name = useSignal('')
  const nav = useNavigate()
  const { addSnackBar } = useSnackBar()

  const startSession = $(async (name: string) => {
    void (await state.connect())

    const payload = await state.emitEvent('StartMeeting', {
      name: name,
    })

    console.log(payload)

    if (payload.success) {
      state.participants = payload.data.meeting.participants

      state.secret = payload.data.secret
      state.idMeeting = payload.data.meeting.id
      const isManager =
        payload.data.meeting.participants[payload.data.sessionData?.userId]
          .isManager

      state.user = {
        ...payload.data.sessionData,
        name: name,
        isManager,
      }
      addSnackBar({
        message: `Has creado una sesión exitosamente`,
      })

      nav(`/play-session?secret=${state.secret}&id=${state.idMeeting}`)
    }
  })

  const joinToSession = $(
    async ({
      name,
      secret,
      idMeeting,
    }: {
      name: string
      secret: string
      idMeeting: string
    }) => {
      void (await state.connect())

      const payload = await state.emitEvent('JoinMeeting', {
        name,
        secret: secret,
        meetingId: idMeeting,
      })
      if (payload!.success) {
        state.participants = payload.data.meeting.participants
        state.participants = payload.data.meeting.participants
        state.secret = payload.data.secret
        state.idMeeting = payload.data.meeting.id

        state.user = {
          ...payload.data.authInfo,
          name,
          isManager: false,
        }
        nav(`/play-session?secret=${state.secret}&id=${state.idMeeting}`)
      }
    }
  )

  const createOrJoinToSession = $(async () => {
    if (QueryParams?.value?.id && QueryParams?.value?.secret) {
      joinToSession({
        name: name.value,
        secret: QueryParams.value.secret,
        idMeeting: QueryParams.value.id,
      })
    } else {
      startSession(name.value)
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

          <Button
            onClick$={createOrJoinToSession}
            outlined
            primary
            size="1.2rem"
          >
            {QueryParams.value.id ? 'Join a session' : 'Create a session'}
          </Button>
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
