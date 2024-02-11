import {
  Slot,
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useStore,
  useTask$,
  type Signal,
} from '@builder.io/qwik'
import Notifications from '~/components/notifications/notifications'

export type Notification = {
  message: string
  status: 'success' | 'error' | 'warning'
}

export interface State {
  notifications: Signal<Notification[]>
}

export const toastProvider = createContextId<State>('ToastProvider')

export const ToastProvider = component$(() => {
  const state = useStore<State>({
    notifications: useSignal<Notification[]>([]),
  })

  useTask$(({ track, cleanup }) => {
    track(() => state.notifications.value)
    const currentNotifications = state.notifications.value[0]
    const timer = setTimeout(() => {
      state.notifications.value = state.notifications.value.filter(
        (notification) => notification.message !== currentNotifications.message
      )
    }, 5000)

    cleanup(() => {
      clearTimeout(timer)
    })
  })

  useContextProvider(toastProvider, state)

  return (
    <>
      <Notifications />
      <Slot />
    </>
  )
})
