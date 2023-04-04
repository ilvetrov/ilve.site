import { nonNullable } from '~/core/nonNullable'
import useLang from '~/langs/useLang'
import LogoIconEn from './assets/logo-en.svg'
import LogoIconRu from './assets/logo-ru.svg'
import styles from './Logo.module.scss'

const LogoIcons: Record<
  string,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  en: LogoIconEn,
  ru: LogoIconRu,
}

export default function Logo() {
  const { lang, defaultLang } = useLang()

  const LogoIcon = LogoIcons[lang] ?? nonNullable(LogoIcons[defaultLang])

  return <LogoIcon className={styles.logo}></LogoIcon>
}
