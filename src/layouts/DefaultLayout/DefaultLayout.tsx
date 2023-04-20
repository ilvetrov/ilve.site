import { ReactNode } from 'react'
import AnimatedColor from '~/components/AnimatedColor/AnimatedColor'
import Header from '~/components/Header/Header'
import { ILayout } from '~/interfaces/App.interface'
import styles from './DefaultLayout.module.scss'

const vars: string[] = ['--font-color-default-animated', '--font-color-link']
const colors: string[] = ['#d5fc80']
const colorsTimeouts = [5000, 3000]

const DefaultLayout: ILayout = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatedColor names={vars} colors={colors} timeout={colorsTimeouts}>
      <div className={styles.layout}>
        <Header></Header>
        {children}
      </div>
    </AnimatedColor>
  )
}

export default DefaultLayout
