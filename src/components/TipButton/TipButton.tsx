import { ReactNode } from 'react'
import styles from './TipButton.module.scss'

export default function TipButton(props: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button onClick={props.onClick} type="button" className={styles.tipButton}>
      <div className={styles.tipButton__content}>{props.children}</div>
    </button>
  )
}
