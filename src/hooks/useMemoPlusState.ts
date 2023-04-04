import { DependencyList, useMemo } from 'react'
import useForceRender from './useForceRender'

type Update = () => void

export default function useMemoPlusState<T>(
  factory: () => T,
  deps: DependencyList,
): [T, Update] {
  const [render, currentRender] = useForceRender()

  const value = useMemo(() => factory(), [currentRender, ...deps])

  return [value, render]
}
