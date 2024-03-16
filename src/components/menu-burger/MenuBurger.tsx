import { $, component$, useSignal } from '@builder.io/qwik'
import style from './menu-burger.module.css'
import { MobileNavbar } from '../mobile-navbar/MobileNavbar'

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
      {mobileNavbarVisible.value && (
        <MobileNavbar showMobileNavbar={mobileNavbarVisible.value} />
      )}
    </div>
  )
})
