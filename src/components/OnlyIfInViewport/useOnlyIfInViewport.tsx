import { MutableRefObject, useEffect, useState } from 'react'
import { nonNullable } from '~/core/nonNullable'

export default function useOnlyIfInViewport(
  ref: MutableRefObject<HTMLElement | null | undefined>,
  yOffset = '200%',
  xOffset = '50%',
  keep = false,
): boolean {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (keep) {
          if (entry?.isIntersecting) {
            observer.disconnect()
            setIsInViewport(true)
          }
        } else {
          setIsInViewport(entry?.isIntersecting ?? false)
        }
      },
      {
        rootMargin: `${yOffset} ${xOffset} ${yOffset} ${xOffset}`,
      },
    )

    observer.observe(nonNullable(ref.current))

    return () => observer.disconnect()
  }, [ref.current])

  return isInViewport
}
