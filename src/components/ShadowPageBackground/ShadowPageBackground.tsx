/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './ShadowPageBackground.module.scss'

export default function ShadowPageBackground({
  children,
  isActive,
  setIsActive,
}: {
  children: ReactNode
  isActive: boolean
  setIsActive: (active: boolean) => void
}) {
  return (
    <>
      <div
        className={clsx(
          styles.background,
          isActive && styles.background_active,
        )}
        onClick={() => setIsActive(false)}
      ></div>
      {children}
    </>
  )
}
