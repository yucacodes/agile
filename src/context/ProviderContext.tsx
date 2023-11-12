import {
  component$,
  useStore,
  useContextProvider,
  createContextId,
  Slot,
} from '@builder.io/qwik'
import { useSocket } from '~/hooks/useSocket'
export interface State {
  user: any
  events: Record<string, any>[]
  isConnect: boolean
}

export const StateProvider = createContextId<State>('StateProvider')

export const Provider = component$(() => {
  const { events, isConnect } = useSocket('events')
  const state = useStore<State>({
    user: null,
    events: events.value,
    isConnect: isConnect.value,
  })

  useContextProvider(StateProvider, state)

  return <Slot />
})
