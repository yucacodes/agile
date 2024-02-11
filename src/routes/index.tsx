import type { DocumentHead } from '@builder.io/qwik-city'

export { HomePage as default } from '~/components/home-page'

export const head: DocumentHead = {
  title: 'PokerSession',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
