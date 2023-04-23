import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import styles from './HiddenRenders.module.scss'

const isServer = typeof window === 'undefined'

export default function HiddenRenders(props: {
  children: ReactNode
  name: string | number
  className?: string
  renderClassName?: string
  hiddenRenderClassName?: string
}) {
  const renders = useRef(new Map<string | number, ReactNode>())

  if (isServer) {
    return (
      <div className={clsx(styles.wrapper, props.className)}>
        <div className={clsx(props.renderClassName)}>{props.children}</div>
      </div>
    )
  }

  renders.current.set(props.name, props.children)

  return (
    <div className={clsx(styles.wrapper, props.className)}>
      {Array.from(renders.current).map(([renderName, render]) => (
        <div
          key={renderName}
          className={clsx(
            props.renderClassName,
            renderName !== props.name &&
              (props.hiddenRenderClassName || styles.hidden),
          )}
        >
          {render}
        </div>
      ))}
    </div>
  )
}
