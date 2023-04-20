import { ReactNode, useRef } from 'react'

export default function PreservedRenders(props: {
  name: unknown
  children: ReactNode
}) {
  const renders = useRef(new Map<unknown, ReactNode>())

  renders.current.set(props.name, props.children)

  return <>{Array.from(renders.current.values())}</>
}
