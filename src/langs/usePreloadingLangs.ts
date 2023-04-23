import { useEffect } from 'react'
import { afterPageLoad } from '~/core/afterPageLoad'
import { LangsInLocalStorage } from './LangsInStorage/LangsInLocalStorage'
import { OneLangInStorage } from './LangsInStorage/OneLangInStorage'
import { OnlyLangWithOldHash } from './LangsInStorage/OnlyLangWithOldHash'
import { SavedLangOrFromApi } from './SavedLang'
import type { ILang } from '@root/serverCore/lang/langs'

/** Very simple preloading. I am ignoring adding new languages for now */
let preloadingFinished = false

const timeoutAfterLoad = 2000

export function usePreloadingLangs(lang: ILang) {
  useEffect(
    afterPageLoad(() => {
      const abortController = new AbortController()

      const timeoutId = setTimeout(async () => {
        if (preloadingFinished) {
          return
        }

        const langs = LangsInLocalStorage()

        await Promise.all(
          lang.names
            .filter((name) => name !== lang.name)
            .map((name) =>
              SavedLangOrFromApi(
                name,
                langs,
                OnlyLangWithOldHash(OneLangInStorage(langs, name), langs),
                abortController.signal,
              ).content(),
            ),
        )

        preloadingFinished = true
      }, timeoutAfterLoad)

      return () => {
        clearTimeout(timeoutId)
        abortController.abort()
      }
    }),
    [],
  )
}
