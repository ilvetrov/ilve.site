import { ForwardedRef, MutableRefObject, useRef } from 'react'
import useSSRLayoutEffect from './useSSRLayoutEffect'

export default function useCombinedRef<T>(
  ...refs: (MutableRefObject<T> | ForwardedRef<T>)[]
) {
  const combinedRef = useRef<T>(null)

  useSSRLayoutEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(combinedRef.current)
      } else {
        // eslint-disable-next-line no-param-reassign
        ref.current = combinedRef.current
      }
    })
    // we need to run the effect on every update so we don't need dependencies
  })

  return combinedRef
}
