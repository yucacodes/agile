import { $, component$, useSignal } from '@builder.io/qwik'
import { MobileNavbar } from '../mobile-navbar/MobileNavbar'
import style from './menu-burger.module.css'

export const MenuBurger = component$(() => {
  const mobileNavbarVisible = useSignal(false)

  const handleMenuBurgerClick = $(() => {
    mobileNavbarVisible.value = !mobileNavbarVisible.value
  })

  return (
    <div>
      <span
        class={`material-icons-outlined ${style.menu}`}
        onClick$={handleMenuBurgerClick}
      >
        menu
      </span>
      <div
        class={`${style.mobileNavbar} ${mobileNavbarVisible.value ? style.show : style.hidden}`}
      >
        <MobileNavbar />
      </div>
    </div>
  )
})
