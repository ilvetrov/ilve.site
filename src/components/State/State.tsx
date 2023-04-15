import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

export default function State<T>(props: {
  value: T
  children: (value: T, setValue: Dispatch<SetStateAction<T>>) => ReactNode
}) {
  const [value, setValue] = useState(props.value)

  return <>{props.children(value, setValue)}</>
}
