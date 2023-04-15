import clsx from 'clsx'
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import useParentState from '~/hooks/useParentState'
import AfterPageLoad from '../AfterPageLoad/AfterPageLoad'
import ExpandableVideo from '../ExpandableVideo/ExpandableVideo'
import FlashingImage from '../FlashingImage/FlashingImage'
import ModalBase from '../Modal/ModalBase'
import OnlyIfInViewport from '../OnlyIfInViewport/OnlyIfInViewport'
import { IVideoSrc } from '../VideoPlayer/VideoPlayer'
import styles from './VideoTip.module.scss'

function VideoTip(props: {
  src: IVideoSrc[]
  sizes: string
  isActive?: boolean
  setIsActive?: Dispatch<SetStateAction<boolean>>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useParentState(
    props.isActive,
    props.setIsActive,
    false,
  )

  const wasActive = useRef(isActive)

  if (isActive && !wasActive.current) {
    wasActive.current = true
  }

  useEffect(() => {
    wasActive.current = false
  }, [props.src])

  return (
    <div className={styles.videoTipWrap}>
      <FlashingImage
        src="/img/home-face-720.jpg"
        srcSet="/img/home-face-720.jpg 720w, /img/home-face-480.jpg 480w, /img/home-face-240.jpg 240w"
        sizes={props.sizes}
        className={styles.placeholderImage}
        flashing={!wasActive.current}
      ></FlashingImage>
      <div
        ref={ref}
        className={clsx(
          styles.videoTip,
          isActive && styles.videoTip_active,
          !wasActive.current && styles.videoTip_init,
        )}
      >
        <AfterPageLoad>
          <OnlyIfInViewport watchRef={ref} yOffset="100%">
            <ModalBase
              isActive={isActive}
              close={useCallback(() => setIsActive(false), [])}
            ></ModalBase>
            <div className={styles.video}>
              <ExpandableVideo
                src={props.src}
                isActive={isActive}
                setIsActive={setIsActive}
              ></ExpandableVideo>
            </div>
          </OnlyIfInViewport>
        </AfterPageLoad>
      </div>
    </div>
  )
}

export default memo(VideoTip)
