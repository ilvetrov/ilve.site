/* eslint-disable no-param-reassign */
import { MutableRefObject, useEffect, useRef } from 'react'

interface IBlocker {
  block(): boolean
  unblock(): boolean
  canBlock(): boolean
}

type IBlockers = Set<IBlocker>

function Blocker(element: HTMLElement, blockers = Blockers(element)): IBlocker {
  const blocker = {
    block() {
      const willBlock = blockers.size === 0

      if (willBlock) {
        element.style.overflow = 'hidden'
      }

      blockers.add(blocker)

      return willBlock
    },
    unblock() {
      blockers.delete(blocker)

      if (blockers.size === 0) {
        element.style.overflow = ''
      }

      return blockers.size === 0
    },
    canBlock() {
      return blockers.size === 0
    },
  }

  return blocker
}

function BlockerWithPadding(
  origin: IBlocker,
  elements: HTMLElement[],
): IBlocker {
  return {
    block() {
      if (origin.canBlock()) {
        elements.forEach((element) => {
          const isBody = element === document.body
          const widthWithScroll = isBody
            ? window.innerWidth
            : element.offsetWidth
          const widthWithoutScroll = element.clientWidth
          const scrollWidth = widthWithScroll - widthWithoutScroll

          element.style.paddingRight = `${scrollWidth}px`
        })
      }

      return origin.block()
    },
    unblock() {
      const unblocked = origin.unblock()

      if (unblocked) {
        elements.forEach((element) => (element.style.paddingRight = ''))
      }

      return unblocked
    },
    canBlock: origin.canBlock,
  }
}

const blockersName = Symbol('blockers')

function Blockers(element: HTMLElement): IBlockers {
  const elementWithBlockers = element as HTMLElement & {
    [blockersName]: IBlockers | undefined
  }

  if (elementWithBlockers[blockersName] === undefined) {
    elementWithBlockers[blockersName] = new Set()
  }

  return elementWithBlockers[blockersName]
}

export default function useBlockScroll(
  isBlocking: boolean,
  element?: MutableRefObject<HTMLElement | undefined | null>,
) {
  const destroyed = useRef(false)

  useEffect(() => {
    destroyed.current = false

    return () => {
      destroyed.current = true
    }
  }, [])

  useEffect(() => {
    if (!isBlocking) {
      return undefined
    }

    const blocker = BlockerWithPadding(
      Blocker(element?.current ?? document.body),
      [element?.current ?? document.body],
    )

    blocker.block()

    return () => {
      blocker.unblock()
    }
  }, [isBlocking, element])
}
