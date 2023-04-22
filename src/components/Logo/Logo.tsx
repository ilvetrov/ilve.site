import useLang from '~/langs/useLang'
import lazySvg, { ImportedSvg } from '../LazySvg/lazySvg'
import HiddenRenders from '../PreservedRenders/HiddenRenders'
import styles from './Logo.module.scss'

const Icon = lazySvg(
  {
    en: () => import(`./assets/logo-en.svg`),
    ru: () => import(`./assets/logo-ru.svg`),
  } as Record<string, ImportedSvg>,
  { className: styles.logo },
  true,
)

export default function Logo() {
  const { lang, defaultLang } = useLang()

  return (
    <HiddenRenders name={lang} renderClassName={styles.wrapper}>
      <Icon variant={lang} defaultVariant={defaultLang}></Icon>
    </HiddenRenders>
  )
}
