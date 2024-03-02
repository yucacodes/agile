import { createDOM } from '@builder.io/qwik/testing'
import { expect, test } from 'vitest'

import { QwikCityMockProvider } from '@builder.io/qwik-city'
import { Navbar } from './navbar'

test(`should render link planning ⭐`, async () => {
  const { screen, render } = await createDOM()
  await render(
    <QwikCityMockProvider>
      <Navbar />
    </QwikCityMockProvider>
  )
  const div = screen.querySelector('[role="planning"]')
  expect(div).not.toBeFalsy()
  expect(div!.outerHTML).toContain('Planning')
})
