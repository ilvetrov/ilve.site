import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './BottomMenu.module.scss'

export default function BottomMenu(props: {
  title?: string
  children: ReactNode
}) {
  return (
    <div className={styles.bottomMenu}>
      <div className={styles.content}>
        {props.title && (
          <div className={clsx(styles.content__title, styles.title)}>
            {props.title}
          </div>
        )}
        {props.children}
      </div>
    </div>
  )
}
