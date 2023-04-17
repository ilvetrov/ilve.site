import { NextRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import useEventCallback from '../useEventCallback'

export default function useBackOrTo(
  router: NextRouter,
  pathname: string,
  isActive: boolean,
): () => void {
  const isInitPage = useRef(true)
  const initRoute = useRef(router.route)

  const lastScroll = useRef<number>()

  useEffect(() => {
    if (!isActive && lastScroll.current) {
      window.scrollTo(0, lastScroll.current)
    }

    lastScroll.current = window.scrollY
  }, [isActive])

  useEffect(() => {
    if (router.route !== initRoute.current) {
      isInitPage.current = false
    }
  }, [router.route])

  return useEventCallback(() => {
    if (isInitPage.current) {
      router.replace({ pathname }, undefined, { scroll: false })
    } else {
      router.back()
    }
  })
}
