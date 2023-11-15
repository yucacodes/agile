import { component$, useContext, useTask$ } from '@builder.io/qwik'
import { Subtitle } from '~/components/subtitle/Subtitle'
import { Title } from '~/components/title/Title'

import { Footer } from '~/components/footer/Footer'
import { PrimaryButton } from '~/components/primary-button/PrimaryButton'
import style from './home.module.css'
import { StateProvider } from '~/context/ProviderContext'

export const HomePage = component$(() => {
  const { socket } = useContext(StateProvider)

  useTask$(({ track }) => {
    track(() => socket.value)
    socket.value?.on('private-message', (events) => {
      console.log('events', events)
    })
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
          <PrimaryButton text="START A SESSION" />
        </div>
        <Footer />
      </main>
    </>
  )
})
