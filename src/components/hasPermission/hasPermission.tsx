import { Slot, component$, useContext } from '@builder.io/qwik'
import { StateProvider } from '~/context/ProviderContext'

export const HasPermission = component$(() => {
  const { user } = useContext(StateProvider)

  return <>{user.value.isManager && <Slot />}</>
})
