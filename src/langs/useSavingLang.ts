import { useEffect } from 'react'
import { IOnlyOnClient } from '~/core/onlyOnClient'
import { ILangsInStorage } from './LangsInStorage/LangsInStorage'
import { OneLangInStorage } from './LangsInStorage/OneLangInStorage'
import type { ILang } from '@root/serverCore/lang/langs'

export function useSavingLang(
  lang: ILang,
  langs: IOnlyOnClient<ILangsInStorage>,
) {
  useEffect(() => {
    const currentLangs = langs.value()

    if (typeof currentLangs === 'undefined') {
      return
    }

    OneLangInStorage(currentLangs, lang.name).write(lang)
  }, [lang])
}
