import {
  Dispatch,
  forwardRef,
  MediaHTMLAttributes,
  memo,
  SetStateAction,
  useEffect,
  useMemo,
} from 'react'
import { assertsNonNullable } from '~/core/asserts'
import useCombinedRef from '~/hooks/useCombinedRef'
import useOnHold from '~/hooks/useOnHold'
import useParentState from '~/hooks/useParentState'
import useOnlyIfInViewport from '../OnlyIfInViewport/useOnlyIfInViewport'

export interface IVideoSrc {
  src: string
  type: string
}

const VideoPlayer = forwardRef<
  HTMLVideoElement | null,
  {
    src: IVideoSrc[]
    isActive?: boolean
    setIsActive?: Dispatch<SetStateAction<boolean>>
  } & Omit<MediaHTMLAttributes<HTMLVideoElement>, 'src'>
>(
  (
    {
      src,
      isActive: parentIsActive,
      setIsActive: setParentIsActive,
      ...elementProps
    },
    parentRef,
  ) => {
    const video = useCombinedRef(parentRef)

    const [isActive, setIsActive] = useParentState(
      parentIsActive,
      setParentIsActive,
      false,
    )

    const playVideoNow = () =>
      void (video.current?.paused && video.current.play().catch(() => {}))
    const pauseVideoNow = () =>
      void (!video.current?.paused && video.current?.pause())

    function activateNow() {
      if (!video.current) return

      video.current.currentTime = 0

      playVideoNow()
    }

    function deactivateNow() {
      if (!video.current) return

      video.current.currentTime = 0
      playVideoNow()
    }

    function onClick() {
      assertsNonNullable(video.current)

      if (isActive && video.current.paused) {
        playVideoNow()

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
        activateNow()

        return undefined
      }

      deactivateNow()

      const abortController = new AbortController()

      video.current?.addEventListener(
        'timeupdate',
        () => {
          assertsNonNullable(video.current)

          if (video.current.currentTime > 5) {
            video.current.currentTime = 0
          }
        },
        { signal: abortController.signal },
      )

      return () => abortController.abort()
    }, [isActive])

    useOnHold(
      video,
      {
        onStart() {
          if (video.current && isActive) {
            pauseVideoNow()
          }
        },
        onEnd() {
          if (video.current && isActive) {
            playVideoNow()
          }
        },
      },
      [src],
    )

    useEffect(() => onEnded, [src])

    const srcKey = useMemo(() => JSON.stringify(src), [src])

    const isInViewport = useOnlyIfInViewport(video, '0%', '0%')

    useEffect(() => {
      if (isActive) return
      if (!video.current) return

      if (isInViewport) {
        playVideoNow()
      } else {
        pauseVideoNow()
      }
    }, [isInViewport, isActive])

    return (
      <video
        key={srcKey}
        ref={video}
        autoPlay
        muted={!isActive}
        loop={!isActive}
        {...elementProps}
        controls={elementProps.controls && isActive}
        onClick={(event) => {
          onClick()
          elementProps.onClick?.(event)
        }}
        onEnded={(event) => {
          onEnded()
          elementProps.onEnded?.(event)
        }}
      >
        {src.map((oneSrc) => (
          <source key={oneSrc.src} src={oneSrc.src} type={oneSrc.type}></source>
        ))}
      </video>
    )
  },
)

export default memo(VideoPlayer)
