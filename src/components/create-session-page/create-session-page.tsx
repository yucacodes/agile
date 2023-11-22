import { $, component$ } from '@builder.io/qwik'
import style from './create-session-page.module.css'
import { useNavigate } from '@builder.io/qwik-city'
import { Title } from '../title/Title'
import { LinkButton } from '../link-button/LinkButton'

export const CreateSessionPage = component$(() => {
  const nav = useNavigate()
  const action = $(() => nav('/play-session'))
  return (
    <>
      <div class={style.content}>
        <Title text="Create Session" />
        <section class={style.form}>
          <input type="text" class={style.input} placeholder="Session name" />
          <LinkButton action={action} text="Create a sessión" />
        </section>
      </div>
    </>
  )
})
