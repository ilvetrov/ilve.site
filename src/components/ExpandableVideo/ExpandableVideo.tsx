import clsx from 'clsx'
import {
  CSSProperties,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
} from 'react'
import { roundTo } from '~/core/roundTo'
import throttle from '~/core/throttle'
import useBlockScroll from '~/hooks/useBlockScroll'
import useMemoPlusState from '~/hooks/useMemoPlusState'
import useParentState from '~/hooks/useParentState'
import useOnlyIfInViewport from '../OnlyIfInViewport/useOnlyIfInViewport'
import VideoPlayer, { IVideoSrc } from '../VideoPlayer/VideoPlayer'
import styles from './ExpandableVideo.module.scss'

interface ExpandedCoordsOfVideo {
  scale: number
  leftOffset: number
  topOffset: number
  maxHeight: number
  borderRadius: number
}

export interface CoordsProps {
  respectDevicePixelRatio?: boolean
  margin?: { top?: number; left?: number; right?: number; bottom?: number }
}

function expandedCoordsOfVideo(
  video: HTMLVideoElement,
  onPage: HTMLElement,
  props?: CoordsProps,
): ExpandedCoordsOfVideo {
  const margin = {
    top: props?.margin?.top ?? 30,
    left: props?.margin?.left ?? 30,
    right: props?.margin?.right ?? 30,
    bottom: props?.margin?.bottom ?? 30,
  }

  const windowWidth =
    Math.min(window.innerWidth, window.outerWidth) -
    Math.max(margin.left + margin.right, 0)
  const windowHeight =
    Math.min(window.innerHeight, window.outerHeight) -
    Math.max(margin.top + margin.bottom, 0)

  const videoRealWidth =
    video.videoWidth /
    (props?.respectDevicePixelRatio ? window.devicePixelRatio : 1)
  const videoRealHeight =
    video.videoHeight /
    (props?.respectDevicePixelRatio ? window.devicePixelRatio : 1)
  const actualVideoWidthHeightRatio = videoRealHeight / videoRealWidth

  const hiddenWidth = onPage.clientWidth
  const hiddenHeight = onPage.clientHeight * actualVideoWidthHeightRatio

  const maxWidth = Math.min(windowWidth, videoRealWidth)
  const scaleByMaxWidth = maxWidth / hiddenWidth
  const maxHeight = Math.min(windowHeight, videoRealHeight)
  const scaleByMaxHeight = maxHeight / hiddenHeight

  const expandedScale = Math.min(scaleByMaxWidth, scaleByMaxHeight)

  const onPageCoords = onPage.getBoundingClientRect()

  const finalWidth = expandedScale * hiddenWidth
  const needLeftOffset = (windowWidth - finalWidth) / 2 + margin.left
  const expandedLeftOffset = (needLeftOffset - onPageCoords.x) / expandedScale

  const finalHeight = expandedScale * hiddenHeight
  const needTopOffset = (windowHeight - finalHeight) / 2 + margin.top
  const expandedTopOffset = (needTopOffset - onPageCoords.y) / expandedScale

  return {
    scale: roundTo(expandedScale, 2),
    leftOffset: roundTo(expandedLeftOffset, 2),
    topOffset: roundTo(expandedTopOffset, 2),
    maxHeight: roundTo(hiddenHeight, 2),
    borderRadius: roundTo(0.38 / expandedScale, 2),
  }
}

const defaultCoords: ExpandedCoordsOfVideo = {
  scale: 1,
  leftOffset: 0,
  topOffset: 0,
  maxHeight: 0,
  borderRadius: 0.38,
}

function ExpandableVideo(props: {
  src: IVideoSrc[]
  isActive?: boolean
  setIsActive?: Dispatch<SetStateAction<boolean>>
  coordsProps?: CoordsProps
}) {
  const video = useRef<HTMLVideoElement>(null)
  const videoOnPage = useRef<HTMLDivElement>(null)

  const isInViewport = useOnlyIfInViewport(videoOnPage, '50%', '50%')

  const [videoIsRunning, setVideoIsRunning] = useParentState(
    props.isActive,
    props.setIsActive,
    false,
  )

  useBlockScroll(videoIsRunning)

  const [
    { scale, leftOffset, topOffset, maxHeight, borderRadius },
    updateCoords,
  ] = useMemoPlusState(() => {
    if (!video.current || !videoOnPage.current || !videoIsRunning)
      return defaultCoords

    return expandedCoordsOfVideo(
      video.current,
      videoOnPage.current,
      props.coordsProps,
    )
  }, [videoIsRunning])

  useEffect(() => {
    if (!videoIsRunning) return undefined

    const onResize = throttle(() => updateCoords(), 1000)

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      onResize.cancel()
    }
  }, [videoIsRunning])

  useEffect(() => {
    if (!videoIsRunning) return undefined

    const onKeyDownPress = throttle((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setVideoIsRunning(false)
      }
    }, 100)

    window.addEventListener('keyup', onKeyDownPress)

    return () => {
      window.removeEventListener('keyup', onKeyDownPress)
    }
  }, [videoIsRunning])

  return (
    <div ref={videoOnPage} className={styles.videoOnPage}>
      <div
        className={clsx(
          styles.videoWrap,
          isInViewport && styles.videoWrap_readyForAnimation,
          videoIsRunning && styles.videoWrap_active,
        )}
        style={
          {
            '--scale': scale,
            '--offset-left': `${leftOffset}px`,
            '--offset-top': `${topOffset}px`,
            '--max-height': `${maxHeight}px`,
            '--border-radius': `${borderRadius}rem`,
          } as CSSProperties
        }
      >
        <VideoPlayer
          ref={video}
          src={props.src}
          isActive={videoIsRunning}
          setIsActive={setVideoIsRunning}
        ></VideoPlayer>
      </div>
    </div>
  )
}

export default memo(ExpandableVideo)
