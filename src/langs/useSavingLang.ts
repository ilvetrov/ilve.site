import { useMemo } from 'react'
import { isClient, onlyOnClient } from '~/core/onlyOnClient'
import { LangInLocalStorage, LangsInLocalStorage } from './LangsInLocalStorage'
import type { ILang } from '@root/pages/api/lang'

export function useSavingLang(lang: ILang) {
  const langsInLocalStorage = useMemo(onlyOnClient(LangsInLocalStorage), [])

  useMemo(() => {
    if (isClient(langsInLocalStorage)) {
      LangInLocalStorage(langsInLocalStorage, lang.name).write(lang)
    }
  }, [lang])
}
