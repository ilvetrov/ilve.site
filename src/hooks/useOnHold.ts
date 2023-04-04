import { DependencyList, MutableRefObject, useEffect } from 'react'

export default function useOnHold(
  element: MutableRefObject<HTMLElement | undefined | null>,
  events: {
    onStart?: () => void
    onEnd?: () => void
  },
  deps?: DependencyList,
) {
  useEffect(() => {
    if (!element.current) return undefined

    let isTouchedTimeout: NodeJS.Timeout | undefined
    let isTouchedNow = false
    let lastTouch: TouchEvent | undefined

    let isHold = false

    function onTouchStart(event: TouchEvent) {
      clearInterval(isTouchedTimeout)
      isTouchedNow = true
      lastTouch = event
      isTouchedTimeout = setTimeout(() => {
        if (isTouchedNow && !isHold) {
          isHold = true
          events.onStart?.()
        }
      }, 500)
    }

    function onTouchMove(event: TouchEvent) {
      if (
        !isHold &&
        lastTouch &&
        isTouchedNow &&
        isTouchedTimeout &&
        lastTouch.touches[0] &&
        event.touches[0]
      ) {
        if (
          Math.abs(lastTouch.touches[0].clientX - event.touches[0].clientX) >
            10 ||
          Math.abs(lastTouch.touches[0].clientY - event.touches[0].clientY) > 10
        ) {
          isTouchedNow = false
          clearInterval(isTouchedTimeout)
        }
      }
    }

    function onTouchEnd() {
      if (isTouchedNow) {
        isTouchedNow = false
        isHold = false
        events.onEnd?.()
      }
    }

    element.current.addEventListener('touchstart', onTouchStart)
    element.current.addEventListener('touchmove', onTouchMove)
    element.current.addEventListener('touchend', onTouchEnd)
    element.current.addEventListener('touchcancel', onTouchEnd)

    // eslint-disable-next-line no-param-reassign
    element.current.oncontextmenu = (event) => event.preventDefault()

    return () => {
      clearInterval(isTouchedTimeout)
      element.current?.removeEventListener('touchstart', onTouchStart)
      element.current?.removeEventListener('touchmove', onTouchMove)
      element.current?.removeEventListener('touchend', onTouchEnd)
      element.current?.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [events.onStart, events.onEnd, ...(deps ?? [])])
}
