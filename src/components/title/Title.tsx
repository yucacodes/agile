import { component$ } from '@builder.io/qwik'
import style from './title.module.css'

export const Title = component$(({ text }: { text: string }) => {
  return (
    <h1 role="title" class={style.title}>
      {text}
    </h1>
  )
})
