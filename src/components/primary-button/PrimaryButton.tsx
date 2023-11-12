import { component$ } from '@builder.io/qwik'
import style from './primary-button.module.css'

export const PrimaryButton = component$(({ text }: { text: string }) => {
  return <button class={style.button}>{text}</button>
})
