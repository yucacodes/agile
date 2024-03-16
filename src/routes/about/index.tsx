import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { CreatorCard } from '~/components/creator-card/CreatorCard'
import style from './about-page.module.css'

export default component$(() => {
  const creators = [
    {
      id: 1,
      name: 'Jorge Narváez',
      photo:
        'https://media.licdn.com/dms/image/C4D03AQFdoLZrccsLKA/profile-displayphoto-shrink_400_400/0/1517001338614?e=1715817600&v=beta&t=TOhgEdD7g_Nj08f7xYB6b7YACyXPErSiOLFvcvtMHaE',
      linkedin: 'https://www.linkedin.com/in/jorge-narvaez-cavadia/',
    },
    {
      id: 2,
      name: 'Ricardo Bermúdez',
      photo:
        'https://media.licdn.com/dms/image/D4E03AQFRjZW9ac_R3Q/profile-displayphoto-shrink_400_400/0/1684503131846?e=1715817600&v=beta&t=h07YEbIgAz0oul3LVp3SOfKrOkqonzsNqGUIJsuI03Q',
      linkedin: 'https://www.linkedin.com/in/ricardotellez7/',
    },
    {
      id: 3,
      name: 'Sharon Florez',
      photo:
        'https://media.licdn.com/dms/image/D4E03AQHxYLv9XfofbA/profile-displayphoto-shrink_400_400/0/1689367925692?e=1715817600&v=beta&t=Er98O2KbWk9F6FSTRY_FiGpr9S1fpen7sWgRRSEb06U',
      linkedin: 'https://www.linkedin.com/in/sharon-daniela-florez-sandoval/',
    },
  ]

  return (
    <div class={style.content}>
      <section>
        <h1 class={style.title}>Team</h1>
        <p class={style.subtitle}>Project creators</p>
      </section>
      <section class={style.creatorCards}>
        {creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            name={creator.name}
            photo={creator.photo}
            linkedin={creator.linkedin}
          />
        ))}
      </section>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Meet the Team',
  meta: [
    {
      name: 'description',
      content: 'Meet the team page description',
    },
  ],
}
