import {
  $,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
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
  const state = useContext(StateProvider)

  const action = $(() => {})

  return (
    <main class={style.container}>
      <p class={style.sessionId}>
        Sesion Id: <span class={style.span}> {state.idMeeting} </span>
      </p>
      <div class={style.desktopView}>
        <section class={style.content}>
          <section class={style.header}>
            <p class={style.timeText}>Time</p>
            <CounterDown
              class={style.time}
              clock
              started={state.startCounter}
              beerTime={new Date().getTime() + 1000 * 60 * 60}
            />
            <p class={style.userName}>{state.user.name}</p>
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
        {!state.isStartedMeeting && (
          <HasPermission>
            <PrimaryButton action={state.initVoting} text="START VOTING" />
          </HasPermission>
        )}

        {state.isStartedMeeting && (
          <>
            <HasPermission>
              <PrimaryButton
                action={state.closeVoting}
                text="Cerrar Votacion"
              />
            </HasPermission>
          </>
        )}
        <HasPermission>
          <SecondaryButton action={state.shareLink} text="SHARED SESSION" />
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
