import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { nonNullable } from '~/core/nonNullable'
import useMounted from '~/hooks/useMounted'

export const rootPortalId = 'root-portal'

export function RootPortal(props: { children: ReactNode }) {
  const isMounted = useMounted()

  return (
    <>
      {isMounted &&
        createPortal(
          props.children,
          nonNullable(document.getElementById(rootPortalId)),
        )}
    </>
  )
}
