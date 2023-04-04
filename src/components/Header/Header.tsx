import Link from 'next/link'
import Descr from '../Descr/Descr'
import LangSwitcher from '../LangSwitcher/LangSwitcher'
import Logo from '../Logo/Logo'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__homeLink}>
          <Link href="/" className={styles.homeLink}>
            <div className={styles.homeLink__line}>
              <Logo></Logo>
            </div>
            <div className={styles.homeLink__line}>
              <Descr></Descr>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.header__langSwitcher}>
        <LangSwitcher></LangSwitcher>
      </div>
    </div>
  )
}
