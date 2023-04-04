import {
  Dispatch,
  forwardRef,
  MediaHTMLAttributes,
  memo,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import AfterPageLoad from '~/components/AfterPageLoad/AfterPageLoad'
import { assertsNonNullable } from '~/core/asserts'
import choiceBetween from '~/core/choiceBetween'
import useCombinedRef from '~/hooks/useCombinedRef'
import useOnHold from '~/hooks/useOnHold'

export interface IVideoSrc {
  src: string
  type: string
}

type ActiveState = [boolean, Dispatch<SetStateAction<boolean>>]

const VideoPlayer = forwardRef<
  HTMLVideoElement | null,
  {
    src: IVideoSrc[]
    onStart?: () => void
    onStop?: () => void
    activeState?: ActiveState
  } & Omit<MediaHTMLAttributes<HTMLVideoElement>, 'src'>
>(({ src, onStart, onStop, activeState, ...elementProps }, parentRef) => {
  const video = useCombinedRef(parentRef)

  const [isActive, setIsActive] = choiceBetween(
    activeState,
    activeState as ActiveState,
    useState(false),
  )

  function activate() {
    if (!video.current) return

    video.current.currentTime = 0
    video.current.play()
    onStart?.()
  }

  function deactivate() {
    if (!video.current) return

    video.current.currentTime = 0
    video.current.play()
    onStop?.()
  }

  function onClick() {
    assertsNonNullable(video.current)

    if (isActive && video.current.paused) {
      video.current.play()

      return
    }

    setIsActive((old) => !old)
  }

  function onEnded() {
    if (!isActive) return
    setIsActive(false)
  }

  useEffect(() => {
    if (isActive) {
      activate()
    } else {
      deactivate()
    }
  }, [isActive])

  useOnHold(
    video,
    useMemo(
      () => ({
        onStart() {
          if (video.current && !video.current.muted && !video.current.paused) {
            video.current.pause()
          }
        },
        onEnd() {
          if (video.current && !video.current.muted && video.current.paused) {
            video.current.play()
          }
        },
      }),
      [],
    ),
    [src],
  )

  useEffect(() => onEnded, [src])

  const srcKey = useMemo(() => JSON.stringify(src), [src])

  return (
    <video
      key={srcKey}
      ref={video}
      autoPlay
      // muted={!isActive}
      muted // for dev
      loop={!isActive}
      {...elementProps}
      onClick={(event) => {
        onClick()
        elementProps.onClick?.(event)
      }}
      onEnded={(event) => {
        onEnded()
        elementProps.onEnded?.(event)
      }}
    >
      <AfterPageLoad>
        {() =>
          src.map((oneSrc) => (
            <source
              key={oneSrc.src}
              src={oneSrc.src}
              type={oneSrc.type}
            ></source>
          ))
        }
      </AfterPageLoad>
    </video>
  )
})

export default memo(VideoPlayer)
