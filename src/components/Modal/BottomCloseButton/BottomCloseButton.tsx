import styles from './BottomCloseButton.module.scss'

export default function BottomCloseButton(props: { close: () => void }) {
  return (
    <div className={styles.closeButtonWrap}>
      <button
        className={styles.closeButton}
        type="button"
        onClick={props.close}
      >
        <img
          src="/img/close.svg"
          alt="Close"
          loading="lazy"
          decoding="async"
          width="18"
          height="18"
          className={styles.closeButton__icon}
        />
      </button>
    </div>
  )
}
