import { useCallback, useRef } from 'react'

export default function useEventCallback<T extends (...args: any[]) => unknown>(
  callback: T,
): T {
  const ref = useRef(callback)

  ref.current = callback

  return useCallback(((...args) => ref.current(...args)) as T, [])
}
