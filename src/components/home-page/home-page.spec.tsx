import { createDOM } from '@builder.io/qwik/testing'
import { test, expect } from 'vitest'

import { QwikCityMockProvider } from '@builder.io/qwik-city'
import { HomePage } from './home-page'

test(`should render title ⭐`, async () => {
  const { screen, render } = await createDOM()
  await render(
    <QwikCityMockProvider>
      <HomePage />
    </QwikCityMockProvider>
  )
  const title = screen.querySelector('[role="title"]')
  expect(title).not.toBeFalsy()
  expect(title!.outerHTML).toContain('Poker Session')
})

test(`should render button ⭐`, async () => {
  const { screen, render } = await createDOM()
  await render(
    <QwikCityMockProvider>
      <HomePage />
    </QwikCityMockProvider>
  )
  const button = screen.querySelector('[role="button-primary"]')
  expect(button).not.toBeFalsy()
  expect(button!.outerHTML).toContain('START A SESSION')
})
