import { useEffect, useState } from 'react'

export default function useMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (isMounted) return

    setIsMounted(true)
  }, [])

  return isMounted
}
