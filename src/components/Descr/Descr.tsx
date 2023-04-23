import useLang from '~/langs/useLang'
import LazySvgFromSrc from '../LazySvg/LazySvgFromSrc'
import HiddenRenders from '../PreservedRenders/HiddenRenders'
import styles from './Descr.module.scss'

export default function Descr() {
  const { lang, langs } = useLang()

  return (
    <HiddenRenders name={lang} renderClassName={styles.wrapper}>
      <LazySvgFromSrc
        src={`/descr-${lang}.svg`}
        preloadSrc={langs
          .filter((oneLang) => oneLang !== lang)
          .map((oneLang) => `/descr-${oneLang}.svg`)}
        className={styles.descr}
        height="19"
      ></LazySvgFromSrc>
    </HiddenRenders>
  )
}
