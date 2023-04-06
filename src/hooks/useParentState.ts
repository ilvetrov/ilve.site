import { Dispatch, SetStateAction, useState } from 'react'

function useParentState<T>(
  parent: T | undefined,
  setParent: Dispatch<SetStateAction<T>> | undefined,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>]

function useParentState<T>(
  parent: T | undefined,
  setParent: Dispatch<SetStateAction<T>> | undefined,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>]

function useParentState<T>(
  parent: T | undefined,
  setParent: Dispatch<SetStateAction<T>> | undefined,
  defaultValue?: T,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [inner, setInner] = useState(defaultValue)

  const parentExists = parent !== undefined && setParent !== undefined

  return [
    parentExists ? parent : inner,
    parentExists
      ? (setParent as Dispatch<SetStateAction<T | undefined>>)
      : setInner,
  ]
}

export default useParentState
