import { component$, Slot } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import {
  CenterContentLayout,
  HeaderLayout,
  NavLink,
  SideNav,
  SidePanelLayout,
  SideNavSection,
  ToogleSidePanel,
} from '@yucacodes/ui-qwik'

import { Background } from '~/components/background/Background'
import { MenuBurger } from '~/components/menu-burger/MenuBurger'
import { Navbar } from '~/components/navbar'
import { ToastProvider } from '~/context/ToastContext'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export default component$(() => {
  return (
    <ToastProvider>
      <SidePanelLayout left>
        <SideNav q:slot="panel">
          <SideNavSection>
            <NavLink href="/">Planning</NavLink>
            <NavLink href="/about/">Meet the team</NavLink>
          </SideNavSection>
        </SideNav>
        <HeaderLayout hideHeaderOnPc>
          <header q:slot="header">
            <ToogleSidePanel>
              <MenuBurger />
            </ToogleSidePanel>
          </header>
          <CenterContentLayout>
            <main class="principal">
              <Background>
                <Navbar />
                <Slot />
              </Background>
            </main>
          </CenterContentLayout>
        </HeaderLayout>
      </SidePanelLayout>
    </ToastProvider>
  )
})
