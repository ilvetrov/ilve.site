import clsx from 'clsx'
import { CSSProperties, useState } from 'react'
import LazyImg from '../LazyImg/LazyImg'
import VideoHint from '../VideoHint/VideoHint'
import { IVideoSrc } from '../VideoPlayer/VideoPlayer'
import VideoTip from '../VideoTip/VideoTip'
import WithBr from '../WithBr/WithBr'
import styles from './Project.module.scss'

interface IProject {
  name?: string
  icon: {
    src: string
    width: number | string
    height: number | string
    finalWidth?: number | string
  }
  descr: string
  siteName: string
  link: string
  video?: IVideoSrc[]
  videoHint?: string
}

export default function Project({ project }: { project: IProject }) {
  const [videoIsRunning, setVideoIsRunning] = useState(false)

  return (
    <div className={styles.project}>
      <div className={styles.project__icon}>
        <a
          href={project.link}
          className={styles.icon}
          target="_blank"
          rel="noreferrer"
        >
          <LazyImg
            src={project.icon.src}
            width={project.icon.width}
            height={project.icon.height}
            className={styles.icon__img}
            style={{ '--width': project.icon.finalWidth } as CSSProperties}
          ></LazyImg>
        </a>
        {project.video && (
          <div className={styles.project__video}>
            <div className={clsx(styles.video)}>
              {project.videoHint && (
                <div className={styles.video__hint}>
                  <VideoHint onClick={() => setVideoIsRunning(true)}>
                    {project.videoHint}
                  </VideoHint>
                </div>
              )}
              <VideoTip
                src={project.video}
                sizes="(max-width: 359px) 13.3vw, (max-width: 1920px) 48px, 2.5vw"
                isActive={videoIsRunning}
                setIsActive={setVideoIsRunning}
              ></VideoTip>
            </div>
          </div>
        )}
      </div>
      {project.name && (
        <a
          href={project.link}
          target="_blank"
          className={clsx(styles.name, styles.project__name)}
          rel="noreferrer"
        >
          <WithBr>{project.name}</WithBr>
        </a>
      )}
      <div className={clsx(styles.descr, styles.project__descr)}>
        <WithBr>{project.descr}</WithBr>
      </div>
      <a
        href={project.link}
        target="_blank"
        className={clsx(styles.site, styles.project__site)}
        rel="noreferrer"
      >
        {project.siteName}
      </a>
    </div>
  )
}
