import { ReactNode } from 'react'
import Header from '~/components/Header/Header'
import { ILayout } from '~/interfaces/App.interface'
import styles from './DefaultLayout.module.scss'

const DefaultLayout: ILayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Header></Header>
      {children}
    </div>
  )
}

export default DefaultLayout
