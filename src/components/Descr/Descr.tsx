import { nonNullable } from '~/core/nonNullable'
import useLang from '~/langs/useLang'
import DescrIconEn from './assets/descr-en.svg'
import DescrIconRu from './assets/descr-ru.svg'
import styles from './Descr.module.scss'

const DescrIcons: Record<
  string,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  en: DescrIconEn,
  ru: DescrIconRu,
}

export default function Descr() {
  const { lang, defaultLang } = useLang()

  const DescrIcon = DescrIcons[lang] ?? nonNullable(DescrIcons[defaultLang])

  return <DescrIcon className={styles.descr}></DescrIcon>
}
