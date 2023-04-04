import { ComponentType } from 'react'

export default function remountOnChange<Props extends object>(
  Component: ComponentType<Props>,
  deps: (props: Props) => unknown,
): typeof Component {
  let oldDeps: unknown | undefined
  let oldKey = 0

  return ((props) => {
    const newDeps = deps(props)

    if (oldDeps !== newDeps) {
      oldKey += 1
    }

    oldDeps = newDeps

    return <Component key={oldKey} {...props}></Component>
  }) as typeof Component
}
