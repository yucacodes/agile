import { component$ } from '@builder.io/qwik'
import style from './secondary-button.module.css'

type TypeSecondaryButton = {
  text: string
  action: () => void
}

export const SecondaryButton = component$<TypeSecondaryButton>(
  ({ text, action }) => {
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
  }
)
