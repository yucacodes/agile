import { component$ } from '@builder.io/qwik'
import style from './subtitle.module.css'

export const Subtitle = component$(({ text }: { text: string }) => {
  return <p class={style.subtitle}>{text}</p>
})
