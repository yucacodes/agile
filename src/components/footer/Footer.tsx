import { component$ } from '@builder.io/qwik'
import { Counter } from '../counter/Counter'

import style from './footer.module.css'

export const Footer = component$(() => {
  return (
    <div class={style.footer}>
      <Counter number={100} text="Planning session" />
      <Counter number={100} text="Planning  players" />
    </div>
  )
})
