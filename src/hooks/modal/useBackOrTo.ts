/* eslint-disable no-restricted-globals */
import { NextRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import useEventCallback from '../useEventCallback'

export default function useBackOrTo(
  router: NextRouter,
  pathname: string,
  isActive: boolean,
): () => void {
  const isInitPage = useRef(true)
  const lastScroll = useRef<number>()

  useEffect(() => {
    if (!isActive && lastScroll.current) {
      window.scrollTo(0, lastScroll.current)
    }

    lastScroll.current = window.scrollY
  }, [isActive])

  return useEventCallback(() => {
    if (isInitPage.current || history.length <= 2) {
      router.replace({ pathname }, undefined, { scroll: false })
    } else {
      router.back()
    }
  })
}
