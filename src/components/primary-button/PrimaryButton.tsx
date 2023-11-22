import { component$ } from '@builder.io/qwik'
import style from './primary-button.module.css'

type TypePrimaryButton = {
  text: string
  action: () => void
}

export const PrimaryButton = component$<TypePrimaryButton>(
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
