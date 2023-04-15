import { DependencyList, memo, ReactNode, useEffect, useState } from 'react'

function Timeout({
  children,
  timeout,
  deps,
}: {
  children: ReactNode
  deps?: DependencyList
  timeout?: number
}) {
  const [currentChildren, setCurrentChildren] = useState<ReactNode>()

  useEffect(() => {
    const id = setTimeout(() => {
      setCurrentChildren(children)
    }, timeout)

    return () => clearTimeout(id)
  }, [timeout, ...(deps ?? [])])

  return <>{currentChildren}</>
}

export default memo(Timeout)
