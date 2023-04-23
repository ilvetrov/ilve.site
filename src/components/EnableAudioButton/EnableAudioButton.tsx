import useLang from '~/langs/useLang'
import TipButton from '../TipButton/TipButton'
import styles from './EnableAudioButton.module.scss'

export default function EnableAudioButton(props: { onClick: () => void }) {
  const { dict } = useLang()

  return (
    <TipButton onClick={props.onClick}>
      <div className={styles.button}>
        {dict.enable_audio}{' '}
        <img
          src="/audio.svg"
          className={styles.icon}
          width="14"
          height="13"
          alt=""
          loading="lazy"
          decoding="async"
        ></img>
      </div>
    </TipButton>
  )
}
