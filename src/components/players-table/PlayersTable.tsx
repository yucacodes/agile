import { component$ } from '@builder.io/qwik'
import style from './players-table.module.css'

export const PlayersTable = component$(() => {
  const players = [
    {
      id: 1,
      name: 'Ricardo',
      points: 2,
    },
    {
      id: 2,
      name: 'Jorge',
      points: 1,
    },
    {
      id: 3,
      name: 'Antonio',
      points: 1,
    },
    {
      id: 4,
      name: 'Miguel',
      points: 3,
    },
    {
      id: 5,
      name: 'Camila',
      points: 1,
    },
  ]

  return (
    <table class={style.table}>
      <thead>
        <tr class={style.tableHeader}>
          <th>Players</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id} class={style.tableBody}>
            <td>{player.name}</td>
            <td>{player.points || '**'} </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
})
