import { ReactNode } from 'react'
import styles from './Title.module.scss'

export default function Title(props: { children: ReactNode }) {
  return <span className={styles.title}>{props.children}</span>
}
