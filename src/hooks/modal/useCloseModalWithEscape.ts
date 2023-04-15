import { useEffect } from 'react'
import { nonNullable } from '~/core/nonNullable'
import throttle from '~/core/throttle'
import useEventCallback from '../useEventCallback'

type Modal = () => void

type Modals = Modal[]

const modals: Modals = []

function register(modal: Modal) {
  if (!modals.includes(modal)) {
    modals.push(modal)
  }
}

function unregister(modal: Modal) {
  const index = modals.indexOf(modal)

  if (index !== -1) {
    modals.splice(index, 1)
  }
}

if (typeof window !== 'undefined') {
  const onKeyDownPress = throttle((event: KeyboardEvent) => {
    if (event.key === 'Escape' && modals.length > 0) {
      const lastModal = nonNullable(modals[modals.length - 1])

      lastModal()
    }
  }, 100)

  window.addEventListener('keyup', onKeyDownPress)
}

export default function useCloseModalWithEscape(
  isActive: boolean,
  close: () => void,
) {
  const ownClose = useEventCallback(() => {
    if (isActive) {
      close()
    }
  })

  useEffect(() => {
    if (!isActive) return undefined

    register(ownClose)

    return () => {
      unregister(ownClose)
    }
  }, [isActive])
}
