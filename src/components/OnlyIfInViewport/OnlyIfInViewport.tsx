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
  keep,
  ...elementProps
}: {
  watchRef?: MutableRefObject<Element | null | undefined>
  children: ReactNode
  yOffset?: Offset
  xOffset?: Offset
  keep?: boolean
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>) {
  const ownElement = useRef<HTMLDivElement>(null)
  const isShowing = useOnlyIfInViewport(
    watchRef ?? ownElement,
    yOffset,
    xOffset,
    keep,
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
