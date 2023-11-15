import { component$ } from '@builder.io/qwik'
import style from './secondary-button.module.css'

export const SecondaryButton = component$(({ text }: { text: string }) => {
  return <button class={style.button}>{text}</button>
})
