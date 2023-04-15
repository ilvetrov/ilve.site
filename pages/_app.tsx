import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'
import langsConfig from '@root/langs.config'
import onlyOnServer from '@root/serverCore/onlyOnServer'
import '~/assets/scss/globals.scss'
import TrueVW from '~/components/TrueSizes/TrueVW'
import { afterPromise } from '~/core/afterPromise'
import { cachedOnce } from '~/core/cachedOnce'
import { nonNullable } from '~/core/nonNullable'
import { onlyOnClient } from '~/core/onlyOnClient'
import throwNotResolved from '~/core/throwNotResolved'
import { NextPageWithLayout } from '~/interfaces/App.interface'
import { LangContext } from '~/langs/Context'
import { LangsInLocalStorage } from '~/langs/LangsInStorage/LangsInLocalStorage'
import { LangsWithoutOldWithOldHash } from '~/langs/LangsInStorage/WithoutOldWithOldHash'
import { SavedLangOrFromApi } from '~/langs/SavedLang'
import { usePreloadingLangs } from '~/langs/usePreloadingLangs'
import { useSavingLang } from '~/langs/useSavingLang'
import DefaultLayout from '~/layouts/DefaultLayout'
import type { ILang } from '@root/serverCore/lang/langs'

type Props = { lang: ILang }

type AppPropsWithLayout = AppProps &
  Props & {
    Component: NextPageWithLayout
  }

export function CustomApp({ Component, pageProps, lang }: AppPropsWithLayout) {
  const PageLayout = Component.layout || DefaultLayout

  useSavingLang(
    lang,
    useMemo(
      () =>
        onlyOnClient(() => LangsWithoutOldWithOldHash(LangsInLocalStorage())),
      [],
    ),
  )
  usePreloadingLangs(lang)

  return (
    <LangContext.Provider value={lang}>
      <PageLayout>
        <Head>
          <title>{lang.dict.site_title}</title>
          <meta name="description" content={lang.dict.site_descr} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
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
        <TrueVW></TrueVW>
        <Component {...pageProps} />
      </PageLayout>
    </LangContext.Provider>
  )
}

const langSourceOnServer = cachedOnce(
  onlyOnServer(() => {
    const imported = throwNotResolved<
      typeof import('@root/serverCore/lang/langs')
    >(
      afterPromise(() => {
        // @ts-expect-error WebPack's business
        return import('@serverCore/lang/langs')
      }),
    )

    imported.requestSafety()

    return imported.value
  }),
)()

CustomApp.getInitialProps = async (
  context: AppContext,
): Promise<Props & AppInitialProps> => {
  const initialProps = await App.getInitialProps(context)

  const name = context.ctx.locale ?? nonNullable(langsConfig?.defaultLocale)

  let lang: ILang

  if (typeof window === 'undefined') {
    const { Lang } = nonNullable(langSourceOnServer)()

    lang = Lang(name)
  } else {
    lang = await SavedLangOrFromApi(name).content()
  }

  return { ...initialProps, lang }
}

export default CustomApp
