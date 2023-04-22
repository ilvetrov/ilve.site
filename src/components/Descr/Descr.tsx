import useLang from '~/langs/useLang'
import lazySvg, { ImportedSvg } from '../LazySvg/lazySvg'
import HiddenRenders from '../PreservedRenders/HiddenRenders'
import styles from './Descr.module.scss'

const Icon = lazySvg(
  {
    en: () => import(`./assets/descr-en.svg`),
    ru: () => import(`./assets/descr-ru.svg`),
  } as Record<string, ImportedSvg>,
  { className: styles.descr },
  true,
)

export default function Descr() {
  const { lang, defaultLang } = useLang()

  return (
    <HiddenRenders name={lang} renderClassName={styles.wrapper}>
      <Icon variant={lang} defaultVariant={defaultLang}></Icon>
    </HiddenRenders>
  )
}
