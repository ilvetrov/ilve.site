import { useEffect, useState } from 'react'
import useBlockScroll from '../useBlockScroll'
import useEventCallback from '../useEventCallback'

export interface IModal {
  displayed: boolean
  visible: boolean
  close: () => void
}

export function useModal(
  isActive: boolean,
  userClose: () => void,
  animationTime: number,
): IModal {
  const [displayed, setDisplayed] = useState(isActive)
  const [visible, setVisible] = useState(isActive)

  const close = useEventCallback(() => {
    if (!isActive) return

    if (displayed && visible) {
      userClose()
    }
  })

  useBlockScroll(isActive)

  useEffect(() => {
    if (isActive) {
      setDisplayed(true)

      let animationFrameId: number | undefined

      const timeoutId = setTimeout(() => {
        animationFrameId = window.requestAnimationFrame(() => {
          setVisible(true)
        })
      }, 50)

      return () => {
        clearTimeout(timeoutId)

        if (animationFrameId !== undefined) {
          window.cancelAnimationFrame(animationFrameId)
        }
      }
    }

    setVisible(false)

    const timeoutId = setTimeout(() => {
      setDisplayed(false)
    }, animationTime)

    return () => clearTimeout(timeoutId)
  }, [isActive])

  return {
    displayed,
    visible,
    close,
  }
}
