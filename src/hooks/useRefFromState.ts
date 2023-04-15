import { MutableRefObject, useRef } from 'react'

export default function useRefFromState<T>(state: T): MutableRefObject<T> {
  const ref = useRef(state)

  ref.current = state

  return ref
}
