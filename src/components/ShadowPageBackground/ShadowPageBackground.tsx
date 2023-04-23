import clsx from 'clsx'
import { CSSProperties } from 'react'
import styles from './ShadowPageBackground.module.scss'

export default function ShadowPageBackground({
  isActive,
  close,
  opacity,
}: {
  isActive: boolean
  close: () => void
  opacity?: number
}) {
  return (
    <div
      className={clsx(styles.background, isActive && styles.background_active)}
      style={{ '--opacity': opacity } as CSSProperties}
      onClick={close}
    ></div>
  )
}
