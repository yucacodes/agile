import { component$, useComputed$ } from '@builder.io/qwik'
import { ErrorIcon } from './error'
import { WarningIcon } from './warning'
import { SuccessIcon } from './success'

export interface IconsProps {
  status: string
}

export const Icons = component$<IconsProps>((props) => {
  const { status } = props
  const icons = {
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    success: <SuccessIcon />,
  }

  const icon = useComputed$(() => {
    return status
  })

  return (
    <>
      {icon.value === 'error'
        ? icons.error
        : icon.value === 'warning'
        ? icons.warning
        : icons.success}
    </>
  )
})
