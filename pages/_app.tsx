/* eslint-disable no-eval */
import App, { AppProps, AppContext, AppInitialProps } from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'
import '~/assets/scss/globals.scss'
import { nonNullable } from '~/core/nonNullable'
import { NextPageWithLayout } from '~/interfaces/App.interface'
import { LangContext } from '~/langs/Context'
import {
  LangInLocalStorage,
  LangsInLocalStorage,
} from '~/langs/LangsInLocalStorage'
import { SavedLang } from '~/langs/SavedLang'
import DefaultLayout from '~/layouts/DefaultLayout'
import type { ILang } from './api/lang'

type Props = { lang: ILang }

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function CustomApp({
  Component,
  pageProps,
  lang,
}: AppPropsWithLayout & Props) {
  const PageLayout = Component.layout || DefaultLayout

  useMemo(() => {
    if (typeof window !== 'undefined') {
      LangInLocalStorage(LangsInLocalStorage(), lang.name).write(lang)
    }
  }, [lang])

  return (
    <LangContext.Provider value={lang}>
      <PageLayout>
        <Head>
          <link
            rel="preload"
            as="font"
            href="/fonts/manrope-400.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/manrope-700.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <Component {...pageProps} />
      </PageLayout>
    </LangContext.Provider>
  )
}

CustomApp.getInitialProps = async (
  context: AppContext,
): Promise<Props & AppInitialProps> => {
  const initialProps = await App.getInitialProps(context)

  const name = nonNullable(
    context.ctx.locale,
    'context.ctx.locale is undefined',
  )

  let lang: ILang

  if (typeof window === 'undefined') {
    const { Lang } = await import('@root/pages/api/lang')

    lang = Lang(name)
  } else {
    lang = await SavedLang(name).content()
  }

  return { ...initialProps, lang }
}

export default CustomApp
