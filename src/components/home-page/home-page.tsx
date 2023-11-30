import { $, component$ } from '@builder.io/qwik'
import { Subtitle } from '~/components/subtitle/Subtitle'
import { Title } from '~/components/title/Title'

import { useNavigate } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'
import { PrimaryButton } from '~/components/primary-button/PrimaryButton'
import style from './home.module.css'

export const HomePage = component$(() => {
  const nav = useNavigate()

  const action = $(() => nav('/create-session'))
  return (
    <>
      <main class={style.container}>
        <div class={style.content}>
          <div class={style.textsContainer}>
            <section>
              <Title text="Poker Session" />
              <Subtitle text="Poker Planning" />
            </section>
            <p class={style.informativeText}>
              An application to planning sessions to make a effective
              communicate point stories from agile teams
            </p>
          </div>
          <PrimaryButton action={action} text="START A SESSION" />
        </div>
        <Footer />
      </main>
    </>
  )
})
