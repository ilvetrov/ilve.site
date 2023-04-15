import useLang from '~/langs/useLang'
import LazySvg from '../LazySvg/LazySvgComponent'
import TipButton from '../TipButton/TipButton'
import styles from './EnableAudioButton.module.scss'

export default function EnableAudioButton(props: { onClick: () => void }) {
  const { dict } = useLang()

  return (
    <TipButton onClick={props.onClick}>
      <div className={styles.button}>
        {dict.enable_audio}{' '}
        <LazySvg
          icon={() => import('./assets/audio.svg')}
          className={styles.icon}
        ></LazySvg>
      </div>
    </TipButton>
  )
}
