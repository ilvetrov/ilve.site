import { ReactNode, useState, useEffect } from 'react'
import { afterPageLoad } from '~/core/afterPageLoad'

let pageLoadedCached = false

export default function AfterPageLoad(props: { children: () => ReactNode }) {
  const [pageLoaded, setPageLoaded] = useState(pageLoadedCached)

  useEffect(
    afterPageLoad(() => {
      if (!pageLoaded) {
        pageLoadedCached = true
        setPageLoaded(true)
      }
    }),
    [],
  )

  return <>{pageLoaded && props.children()}</>
}
