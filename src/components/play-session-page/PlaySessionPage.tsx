import { $, component$, useContext } from '@builder.io/qwik'
import { PrimaryButton } from '~/components/primary-button/PrimaryButton'
import { SecondaryButton } from '../secondary-button/SecondaryButton'
import { PlayersTable } from '../players-table/PlayersTable'
import { Points } from '../points/Points'
import style from './play-session-page.module.css'
import { StateProvider } from '~/context/ProviderContext'

export const PlaySessionPage = component$(() => {
  const { socket, user } = useContext(StateProvider)

  const action = $(() => {})
  return (
    <main class={style.container}>
      <p class={style.sessionId}>
        Sesion Id: <span class={style.span}>453d-fdre-ferfs-sdfrg</span>
      </p>
      <div class={style.desktopView}>
        <section class={style.content}>
          <section class={style.header}>
            <p class={style.timeText}>Time</p>
            <p class={style.time}>00:10:00</p>
            <p class={style.userName}>{user.value.meetingParticipantName}</p>
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
        <PrimaryButton action={action} text="CLEAR VOTES" />
        <PrimaryButton action={action} text="SHOW VOTES" />
        <SecondaryButton text="SHARED SESSION" />
      </section>
    </main>
  )
})
