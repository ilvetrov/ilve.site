import styles from './VideoHint.module.scss'

export default function VideoHint(props: {
  onClick: () => void
  children: string
}) {
  return (
    <button className={styles.videoHint} type="button" onClick={props.onClick}>
      <div className={styles.videoHint__text}>{props.children}</div>
      <img
        src="/img/arrow-top-bottom-left.svg"
        loading="lazy"
        decoding="async"
        width="11"
        height="19"
        alt="Arrow"
        className={styles.videoHint__arrow}
      ></img>
    </button>
  )
}
