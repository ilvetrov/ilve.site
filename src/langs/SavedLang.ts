import { LangFromApi } from './LangFromApi'
import { LangInLocalStorage, LangsInLocalStorage } from './LangsInLocalStorage'
import type { ILang } from '@root/pages/api/lang'

export interface ISavedLang {
  content(): Promise<ILang>
}

export function SavedLang(name?: string): ISavedLang {
  const langs = LangsInLocalStorage()
  const lang = LangInLocalStorage(langs, name)

  return {
    async content() {
      const langInLocalStorage = lang.content()

      if (langInLocalStorage) {
        return langInLocalStorage
      }

      const fromApi = await LangFromApi(name, langs.content()?.hash).content()

      lang.write(fromApi)

      return fromApi
    },
  }
}
