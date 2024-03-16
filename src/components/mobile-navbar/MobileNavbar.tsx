import { component$, useComputed$ } from '@builder.io/qwik'
import { Link, useLocation } from '@builder.io/qwik-city'
import style from './mobile-navbar.module.css'

export const MobileNavbar = component$(
  ({ showMobileNavbar }: { showMobileNavbar: boolean }) => {
    const loc = useLocation()
    const pathname = useComputed$(() => {
      return loc.url.pathname
    })

    return (
      <div
        class={`${style.container} ${showMobileNavbar ? style.show : style.hidden}`}
      >
        <Link
          href="/"
          role="planning"
          class={{
            active: pathname.value === '/',
          }}
        >
          Planning
        </Link>
        <Link
          href="/about"
          role="meetTheTeam"
          class={{
            active: pathname.value === '/about/',
          }}
        >
          Meet the team
        </Link>
      </div>
    )
  }
)
