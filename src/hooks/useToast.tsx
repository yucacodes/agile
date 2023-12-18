import { $, useContext } from '@builder.io/qwik'
import { type Notification, toastProvider } from '~/context/ToastContext'

const useToast = () => {
  const { notifications } = useContext(toastProvider)

  const addNotification = $((notification: Notification) => {
    notifications.value = [...notifications.value, notification]
  })

  return {
    notifications,
    addNotification,
  }
}

export { useToast }
