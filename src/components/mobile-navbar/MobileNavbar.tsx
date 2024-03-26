import { component$, useComputed$ } from '@builder.io/qwik'
import { Link, useLocation } from '@builder.io/qwik-city'
import { Button } from '@yucacodes/ui-qwik'
import style from './mobile-navbar.module.css'

export const MobileNavbar = component$(() => {
  const loc = useLocation()
  const pathname = useComputed$(() => {
    return loc.url.pathname
  })

  return (
    <div class={style.root}>
      <section class={style.container}>
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
      </section>
      <Button text black>
        Donate
      </Button>
    </div>
  )
})
