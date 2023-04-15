import { ReactNode, useState, useEffect } from 'react'
import { afterPageLoad } from '~/core/afterPageLoad'

let isPageLoadedCached = false

export default function AfterPageLoad({ children }: { children: ReactNode }) {
  const [isPageLoaded, setIsPageLoaded] = useState(isPageLoadedCached)

  useEffect(
    afterPageLoad(() => {
      if (!isPageLoaded) {
        isPageLoadedCached = true
        setIsPageLoaded(true)
      }
    }),
    [],
  )

  return <>{isPageLoaded && children}</>
}
