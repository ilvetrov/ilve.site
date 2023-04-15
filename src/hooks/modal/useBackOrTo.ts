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
  const routesHistory = useRef<string[]>([])
  const lastPage = useRef<string>()
  const lastScroll = useRef<number>()

  useEffect(() => {
    if (
      !isActive &&
      router.route !== lastPage.current &&
      router.route ===
        routesHistory.current[routesHistory.current.length - 2] &&
      lastScroll.current
    ) {
      window.scrollTo(0, lastScroll.current)
    }
  }, [router.route, isActive])

  useEffect(() => {
    lastScroll.current = window.scrollY
  }, [isActive])

  useEffect(() => {
    if (router.route !== lastPage.current) {
      isInitPage.current = false

      lastPage.current = router.route
      routesHistory.current.push(router.route)
    }
  }, [router.route])

  return useEventCallback(() => {
    if (isInitPage.current || history.length <= 2) {
      router.replace({ pathname }, undefined, { scroll: false })
    } else {
      router.back()
    }
  })
}
