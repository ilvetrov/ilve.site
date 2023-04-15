/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import BottomCloseButton from '../BottomCloseButton/BottomCloseButton'
import styles from './Center.module.scss'

export default function Center(props: {
  isActive: boolean
  close: () => void
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={clsx(styles.wrap, props.isActive && styles.wrap_visible)}
      onClick={(event) => {
        if (event.target === ref.current) {
          props.close()
        }
      }}
    >
      <div className={styles.center}>{props.children}</div>
      <BottomCloseButton close={props.close}></BottomCloseButton>
    </div>
  )
}
