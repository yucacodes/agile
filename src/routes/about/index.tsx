import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { CreatorCard } from '~/components/creator-card/CreatorCard'
import style from './about-page.module.css'

import jorgeImage from '../../../public/jorge.jpg?jsx'
import ricardoImage from '../../../public/ricardo.jpg?jsx'
import sharonImage from '../../../public/sharon.jpg?jsx'

export default component$(() => {
  const creators = [
    {
      id: 1,
      name: 'Jorge Narváez',
      Image:jorgeImage,
      linkedin: 'https://www.linkedin.com/in/jorge-narvaez-cavadia/',
    },
    {
      id: 2,
      name: 'Ricardo Bermúdez',
      Image: ricardoImage,
      linkedin: 'https://www.linkedin.com/in/ricardotellez7/',
    },
    {
      id: 3,
      name: 'Sharon Florez',
      Image:sharonImage,
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
        {creators.map(({
          id,
          name,
          Image,
          linkedin
        }) => (
          <CreatorCard
            key={id}
            name={name}
          
            linkedin={linkedin}
          >
            <Image  />
          </CreatorCard>
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
