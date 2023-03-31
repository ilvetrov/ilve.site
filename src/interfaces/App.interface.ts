import { NextPage } from 'next'
import { ReactNode } from 'react'

export type ILayout = (props: { children: ReactNode }) => JSX.Element

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<Props = {}> = NextPage<Props> & {
  layout?: ILayout
}
