import {
  Fragment,
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  useRef,
} from 'react'
import useOnlyIfInViewport from './useOnlyIfInViewport'

type Offset = `${string}${'%' | 'px'}`

export default function OnlyInViewport({
  children,
  watchRef,
  yOffset,
  xOffset,
  ...elementProps
}: {
  watchRef?: MutableRefObject<HTMLElement | null | undefined>
  children: ReactNode
  yOffset?: Offset
  xOffset?: Offset
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>) {
  const ownElement = useRef<HTMLDivElement>(null)
  const isShowing = useOnlyIfInViewport(
    watchRef ?? ownElement,
    yOffset,
    xOffset,
    true,
  )

  const WrapElement = watchRef ? Fragment : 'div'

  return (
    <WrapElement
      ref={watchRef ? undefined : ownElement}
      {...(watchRef ? elementProps : {})}
    >
      {isShowing && children}
    </WrapElement>
  )
}
