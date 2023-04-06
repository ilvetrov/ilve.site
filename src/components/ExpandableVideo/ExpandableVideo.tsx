import clsx from 'clsx'
import {
  CSSProperties,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { roundTo } from '~/core/roundTo'
import throttle from '~/core/throttle'
import useBlockScroll from '~/hooks/useBlockScroll'
import useMemoPlusState from '~/hooks/useMemoPlusState'
import useParentState from '~/hooks/useParentState'
import remountOnChange from '../RemountOnChange/RemountOnChange'
import VideoPlayer, { IVideoSrc } from '../VideoPlayer/VideoPlayer'
import styles from './ExpandableVideo.module.scss'

interface ExpandedCoordsOfVideo {
  scale: number
  leftOffset: number
  topOffset: number
}

function expandedCoordsOfVideo(
  video: HTMLVideoElement,
  onPage: HTMLElement,
): ExpandedCoordsOfVideo {
  const windowWidth = Math.min(window.innerWidth, window.outerWidth)
  const windowHeight = Math.min(window.innerHeight, window.outerHeight)

  const maxWidth = Math.min(windowWidth * 0.8, video.videoWidth)
  const scaleByMaxWidth = maxWidth / onPage.clientWidth
  const maxHeight = Math.min(windowHeight * 0.9, video.videoHeight)
  const actualVideoWidthHeightRatio = video.videoHeight / video.videoWidth
  const scaleByMaxHeight =
    maxHeight / (onPage.clientHeight * actualVideoWidthHeightRatio)

  const expandedScale = Math.min(scaleByMaxWidth, scaleByMaxHeight)

  const onPageCoords = onPage.getBoundingClientRect()

  const finalWidth = expandedScale * onPage.clientWidth
  const needLeftOffset = (windowWidth - finalWidth) / 2
  const expandedLeftOffset = (needLeftOffset - onPageCoords.x) / expandedScale

  const finalHeight =
    expandedScale * onPage.clientHeight * actualVideoWidthHeightRatio
  const needTopOffset = (windowHeight - finalHeight) / 2
  const expandedTopOffset = (needTopOffset - onPageCoords.y) / expandedScale

  return {
    scale: roundTo(expandedScale, 2),
    leftOffset: roundTo(expandedLeftOffset, 2),
    topOffset: roundTo(expandedTopOffset, 2),
  }
}

const defaultCoords: ExpandedCoordsOfVideo = {
  scale: 1,
  leftOffset: 0,
  topOffset: 0,
}

function ExpandableVideo(props: {
  src: IVideoSrc[]
  isActive?: boolean
  setIsActive?: Dispatch<SetStateAction<boolean>>
}) {
  const video = useRef<HTMLVideoElement>(null)
  const videoOnPage = useRef<HTMLDivElement>(null)

  const [videoIsRunning, setVideoIsRunning] = useParentState(
    props.isActive,
    props.setIsActive,
    false,
  )

  const [isExpanded, setIsExpanded] = useState(false)

  useBlockScroll(isExpanded)

  const onStart = useCallback(() => setIsExpanded(true), [])
  const onStop = useCallback(() => setIsExpanded(false), [])

  const [{ scale, leftOffset, topOffset }, updateCoords] =
    useMemoPlusState(() => {
      if (!video.current || !videoOnPage.current || !isExpanded)
        return defaultCoords

      return expandedCoordsOfVideo(video.current, videoOnPage.current)
    }, [isExpanded])

  useEffect(() => {
    const onResize = throttle(() => updateCoords(), 1000)

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      onResize.cancel()
    }
  }, [])

  return (
    <div ref={videoOnPage} className={styles.videoOnPage}>
      <div
        className={clsx(
          styles.videoWrap,
          isExpanded && styles.videoWrap_active,
        )}
        style={
          {
            '--scale': scale,
            '--offset-left': `${leftOffset}px`,
            '--offset-top': `${topOffset}px`,
          } as CSSProperties
        }
      >
        <VideoPlayer
          ref={video}
          src={props.src}
          onStart={onStart}
          onStop={onStop}
          isActive={videoIsRunning}
          setIsActive={setVideoIsRunning}
        ></VideoPlayer>
      </div>
    </div>
  )
}

export default memo(remountOnChange(ExpandableVideo, ({ src }) => src))
