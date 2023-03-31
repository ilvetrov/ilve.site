import { ReactNode } from 'react'
import { ILayout } from '~/interfaces/App.interface'

const DefaultLayout: ILayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

export default DefaultLayout
