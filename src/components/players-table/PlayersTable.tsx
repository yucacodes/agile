import { component$, useContext, useSignal, useTask$ } from '@builder.io/qwik'
import { StateProvider } from '~/context/ProviderContext'
import style from './players-table.module.css'

export const PlayersTable = component$(() => {
  const state = useContext(StateProvider)

  const participantsArr = useSignal<any[]>([])

  useTask$(({ track }) => {
    track(() => state.participants)
    track(() => state.votes)

    participantsArr.value = Object.values(state.participants).map(
      (participant) => {
        return {
          name: participant.name,
          points: state.votes[participant.userId] || null,
        }
      }
    )
  })

  return (
    <section class={style.players}>
      <header class={style.headers}>
        <h6>Players</h6>

        <h6>Points</h6>
      </header>

      <div class={style.playersContainer}>
        {participantsArr.value.map((participant, index) => (
          <div class={style.player} key={index}>
            {participant.isManager && (
              <span class={`material-icons-outlined ${style.check}`}>
                manager
              </span>
            )}
            {participant.points && (
              <span class={`material-icons-outlined ${style.check}`}>done</span>
            )}
            <p>{participant.name}</p>
            <p>{participant.points}</p>
          </div>
        ))}
      </div>
    </section>
  )
})
