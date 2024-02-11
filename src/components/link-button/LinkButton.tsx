import { component$ } from '@builder.io/qwik'
import style from './link-button.module.css'

type LinkButtonType = {
  text: string
  action: () => void
}

export const LinkButton = component$<LinkButtonType>(({ text, action }) => {
  return (
    <button
      onClick$={() => {
        action()
      }}
      class={style.button}
    >
      {text}
    </button>
  )
})
