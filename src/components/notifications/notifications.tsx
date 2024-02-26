import { component$, useContext } from '@builder.io/qwik'
import { toastProvider } from '~/context/ToastContext'
import style from './notification.module.css'
import { Icons } from '../icons/icons'

export default component$(() => {
  const { notifications } = useContext(toastProvider)
  return (
    <>
      {notifications.value.length !== 0 &&
        notifications.value.map((notification, index) => (
          <div
               
            class={{
              [style.toast]: true,
              [style.success]: notification.status === 'success',
              [style.error]: notification.status === 'error',
              [style.warning]: notification.status === 'warning',
            }}
            key={index}
          >
            <Icons status={notification.status} />
            <p> {notification.message}</p>
          </div>
        ))}
    </>
  )
})
