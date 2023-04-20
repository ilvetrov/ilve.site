import { CSSProperties, ReactNode, useEffect, useMemo, useState } from 'react'
import If from '~/core/If'
import { nonNullableFunc } from '~/core/nonNullable'
import { MappedObject, ObjectFromArray } from '~/core/objectFromArray'

export default function AnimatedColor(props: {
  names: string[]
  children: ReactNode
  colors: string[]
  timeout: number | number[]
  defaultColor?: string
}) {
  const [color, setColor] = useState<string | undefined>(props.defaultColor)

  useEffect(() => {
    const colors = [props.defaultColor, ...props.colors]

    let currentColorId = 0

    const nextId = () =>
      currentColorId + 1 >= colors.length ? 0 : currentColorId + 1

    const setNextColor = () => {
      const newId = nextId()

      currentColorId = newId

      setColor(colors[newId])
    }

    const timeoutTime = nonNullableFunc(
      If(
        () => typeof props.timeout === 'number',
        () => props.timeout as number,
        If(
          () => (props.timeout as number[])[currentColorId] !== undefined,
          () => (props.timeout as number[])[currentColorId],
          () => (props.timeout as number[])[0],
        ),
      ),
    )

    let id: NodeJS.Timeout | undefined

    const cycledTimeout = () => {
      setNextColor()

      id = setTimeout(cycledTimeout, timeoutTime())
    }

    id = setTimeout(cycledTimeout, timeoutTime())

    return () => clearTimeout(id)
  }, [props.colors, props.defaultColor, props.timeout])

  const variables = useMemo(
    () =>
      MappedObject(
        ObjectFromArray(() => props.names),
        () => color,
      )(),
    [props.names, color],
  )

  return <div style={variables as CSSProperties}>{props.children}</div>
}
