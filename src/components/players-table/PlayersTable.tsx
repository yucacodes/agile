import { component$, useContext } from '@builder.io/qwik'
import { StateProvider } from '~/context/ProviderContext'
import style from './players-table.module.css'

export const PlayersTable = component$(() => {
  const {  participants } = useContext(StateProvider)

  console.log(participants.value);
  

  return (
    <table class={style.table}>
      <thead>
        <tr class={style.tableHeader}>
          <th class={style.playerColumn}>Players</th>
          <th class={style.pointsColumn}>Points</th>
        </tr>
      </thead>
      <tbody>
        {participants.value.map((player) => (
          <tr key={player.userId} class={style.tableBody}>
            <td class={style.playerColumn}>
              {player.isManager && (
                <span class={`material-icons-outlined ${style.manager}`}>
                  manager
                </span>
              )}
              { player?.points && player.points > 0 && (
                <span class={`material-icons-outlined ${style.check}`}>
                  done
                </span>
              )}
              {player.name}
            </td>
            <td class={style.pointsColumn}>{player.points ?? '**'} </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
})
