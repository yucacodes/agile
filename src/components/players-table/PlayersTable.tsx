import { component$ } from '@builder.io/qwik'
import style from './players-table.module.css'

export const PlayersTable = component$(() => {
  const players = [
    {
      id: 1,
      name: 'Ricardo',
      points: 2,
      manager: true,
    },
    {
      id: 2,
      name: 'Jorge',
      points: 1,
      manager: false,
    },
    {
      id: 3,
      name: 'Antonio',
      points: 1,
      manager: false,
    },
    {
      id: 4,
      name: 'Miguel',
      points: 3,
      manager: false,
    },
    {
      id: 5,
      name: 'Camila',
      points: 1,
      manager: false,
    },
  ]

  return (
    <table class={style.table}>
      <thead>
        <tr class={style.tableHeader}>
          <th class={style.playerColumn}>Players</th>
          <th class={style.pointsColumn}>Points</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id} class={style.tableBody}>
            <td class={style.playerColumn}>
              {player.manager && (
                <span class={`material-icons-outlined ${style.check}`}>
                  done
                </span>
              )}
              {player.name}
            </td>
            <td class={style.pointsColumn}>{player.points || '**'} </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
})
