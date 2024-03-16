import { component$ } from '@builder.io/qwik'
import { LinkedinIcon } from '../icons/linkedin'
import { Link } from '@builder.io/qwik-city'
import style from './creator-card.module.css'

export const CreatorCard = component$(
  ({
    name,
    photo,
    linkedin,
  }: {
    name: string
    photo: string
    linkedin: string
  }) => {
    return (
      <Link href={linkedin} target="_blank" class={style.cardContainer}>
        <div class={style.photoContainer}>
          <img
            src={photo}
            class={style.photo}
            decoding="async"
            loading="lazy"
            alt="photo"
            width="100"
            height="100"
          />
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
