import clsx from 'clsx'
import {
  Fragment,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import maybeFunction from '~/core/maybeFunction'
import useCloseModalWithEscape from '~/hooks/modal/useCloseModalWithEscape'
import { IModal, useModal } from '~/hooks/modal/useModal'
import useBlockScroll from '~/hooks/useBlockScroll'
import { RootPortal } from '../RootPortal/RootPortal'
import ShadowPageBackground from '../ShadowPageBackground/ShadowPageBackground'
import styles from './ModalBase.module.scss'
import { IModalContext, ModalContext } from './ModalContext'

function ModalBase({
  children,
  isActive,
  animationTime = 300,
  inRoot,
  close,
  backgroundOpacity,
}: {
  children?: ReactNode | ((modal: IModal) => ReactNode)
  isActive: boolean
  animationTime?: number
  inRoot?: boolean
  close: () => void
  backgroundOpacity?: number
}) {
  useBlockScroll(isActive)

  useCloseModalWithEscape(isActive, close)

  const modal = useModal(
    isActive,
    close,
    animationTime > 300 ? animationTime : 300,
  )

  const parentContext = useContext(ModalContext)

  useEffect(() => {
    if (!parentContext.isActive && isActive) {
      close()
    }
  }, [parentContext.isActive])

  const context = useMemo(
    () => ({ isActive } satisfies IModalContext),
    [isActive],
  )

  const PortalWrapper = useMemo(
    () => (inRoot ? RootPortal : Fragment),
    [inRoot],
  )

  return (
    <PortalWrapper>
      <ModalContext.Provider value={context}>
        <div
          className={clsx(
            styles.modalBase,
            modal.displayed && styles.modalBase_displayed,
          )}
        >
          <ShadowPageBackground
            isActive={modal.visible}
            close={modal.close}
            opacity={backgroundOpacity}
          ></ShadowPageBackground>
          {maybeFunction(children)(modal)}
        </div>
      </ModalContext.Provider>
    </PortalWrapper>
  )
}

export default memo(ModalBase)
