import { Slot, component$, useContext } from '@builder.io/qwik'
import { StateProvider } from '~/context/ProviderContext'

export const HasPermission = component$(() => {
  const state = useContext(StateProvider)

  return <>{state.user.isManager && <Slot />}</>
})
