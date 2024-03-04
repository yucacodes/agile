import { component$, useContext } from '@builder.io/qwik'
import { StateProvider } from '~/context/ProviderContext'
import style from './players-table.module.css'

export const PlayersTable = component$(() => {
  const state = useContext(StateProvider)

  console.log(state.participants);
  

  return (
    <table class={style.table}>
      <thead>
        <tr class={style.tableHeader}>
          <th class={style.playerColumn}>Players</th>
          <th class={style.pointsColumn}>Points</th>
        </tr>
      </thead>
      <tbody>
       
      </tbody>
    </table>
  )
})
