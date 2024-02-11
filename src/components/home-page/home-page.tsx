import { $, component$, useContext } from '@builder.io/qwik'
import { Subtitle } from '~/components/subtitle/Subtitle'
import { Title } from '~/components/title/Title'

import { useNavigate } from '@builder.io/qwik-city'
import { Footer } from '~/components/footer/Footer'

import style from './home.module.css'
import { Button } from '@yucacodes/ui-qwik'

import { StateProvider } from '~/context/ProviderContext'

export const HomePage = component$(() => {
  const { createSocket } = useContext(StateProvider)
  const nav = useNavigate()

  const action = $(() => {
    createSocket();
    nav('/join-session')
  })
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
          <Button onClick$={action} contained primary size="1.2rem">
            START A SESSION
          </Button>
        </div>
        <Footer />
      </main>
    </>
  )
})
