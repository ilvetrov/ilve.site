import Link from 'next/link'
import { useRouter } from 'next/router'
import useLang from '~/langs/useLang'
import styles from './LangSwitcher.module.scss'

const LangSwitcher = () => {
  const router = useRouter()
  const { lang, nextLang, dict } = useLang()

  return (
    <div className={styles.langSwitcher}>
      <Link
        href={router.asPath}
        locale={nextLang}
        className={styles.langSwitcher__link}
        title={dict.lang_name}
      >
        {lang}
      </Link>
    </div>
  )
}

export default LangSwitcher
