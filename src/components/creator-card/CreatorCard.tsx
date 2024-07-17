import { component$, Slot } from '@builder.io/qwik'
import { LinkedinIcon } from '../icons/linkedin'
import { Link } from '@builder.io/qwik-city'
import style from './creator-card.module.css'

export const CreatorCard = component$(
  ({
    name,
    linkedin,
  }: {
    name: string
    linkedin: string
  }) => {
    return (
      <Link href={linkedin} target="_blank" class={style.cardContainer}>
        <div class={style.photoContainer}>
         <Slot />
        </div>
        <div class={style.infoContainer}>
          <section class={style.creatorNameContainer}>
            <p class={style.creatorName}>{name}</p>
            <LinkedinIcon />
          </section>
          <p class={style.profession}>Fullstack Developer</p>
        </div>
      </Link>
    )
  }
)
