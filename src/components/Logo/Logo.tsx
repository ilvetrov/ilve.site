import useLang from '~/langs/useLang'
import LazySvgFromSrc from '../LazySvg/LazySvgFromSrc'
import HiddenRenders from '../PreservedRenders/HiddenRenders'
import styles from './Logo.module.scss'

export default function Logo() {
  const { lang, langs } = useLang()

  return (
    <HiddenRenders name={lang} renderClassName={styles.wrapper}>
      <LazySvgFromSrc
        src={`/logo-${lang}.svg`}
        preloadSrc={langs
          .filter((oneLang) => oneLang !== lang)
          .map((oneLang) => `/logo-${oneLang}.svg`)}
        className={styles.logo}
        height="23"
      ></LazySvgFromSrc>
    </HiddenRenders>
  )
}
