import { component$ } from '@builder.io/qwik'
import { PrimaryButton } from '~/components/primary-button/PrimaryButton'
import { SecondaryButton } from '../secondary-button/SecondaryButton'
import { PlayersTable } from '../players-table/PlayersTable'
import { Points } from '../points/Points'
import style from './play-session-page.module.css'

export const PlaySessionPage = component$(() => {
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
            <p class={style.userName}>Ricardo Bermudez</p>
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
        <PrimaryButton text="CLEAR VOTES" />
        <PrimaryButton text="SHOW VOTES" />
        <SecondaryButton text="SHARED SESSION" />
      </section>
    </main>
  )
})
