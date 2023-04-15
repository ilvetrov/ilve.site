import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './BigButton.module.scss'

export default function BigButton(props: {
  title: ReactNode
  text: ReactNode
  onClick?: () => void
}) {
  return (
    <button onClick={props.onClick} className={styles.bigButton} type="button">
      <div className={clsx(styles.title, styles.bigButton__title)}>
        {props.title}
      </div>
      <div className={clsx(styles.text, styles.bigButton__text)}>
        {props.text}
      </div>
    </button>
  )
}
