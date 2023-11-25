import { $, component$, useContext, useSignal } from '@builder.io/qwik'
import style from './create-session-page.module.css'
import { useNavigate } from '@builder.io/qwik-city'
import { Title } from '../title/Title'
import { LinkButton } from '../link-button/LinkButton'
import { StateProvider } from '~/context/ProviderContext'

export const CreateSessionPage = component$(() => {
  const { socket, user } = useContext(StateProvider)
  const name = useSignal('')

  const nav = useNavigate()
  const action = $(() => {
    socket.value?.emit(
      'StartMeeting',
      {
        name: name.value,
      },
      (response) => {
        if (!response.success) {
          return
        }
        user.value = response.result.authInfo
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
          <LinkButton action={action} text="Create a session" />
        </section>
      </div>
    </>
  )
})
