import { LangFromApi } from './LangFromApi'
import { LangsInLocalStorage } from './LangsInStorage/LangsInLocalStorage'
import { ILangsInStorage } from './LangsInStorage/LangsInStorage'
import {
  IOneLangInStorage,
  OneLangInStorage,
} from './LangsInStorage/OneLangInStorage'
import type { ILang } from '@root/serverCore/lang/langs'

export interface ISavedLang {
  content(): Promise<ILang>
}

const isProduction = process.env.NODE_ENV !== 'development'

export function SavedLangOrFromApi(
  name?: string,
  langs: ILangsInStorage = LangsInLocalStorage(),
  lang: IOneLangInStorage = OneLangInStorage(langs, name),
  abortSignal?: AbortSignal,
): ISavedLang {
  return {
    async content() {
      try {
        const langInLocalStorage = lang.content()

        if (langInLocalStorage && isProduction) {
          return langInLocalStorage
        }
      } catch (error) {
        //
      }

      const fromApi = await LangFromApi(
        name,
        langs.content()?.hash,
        abortSignal,
      ).content()

      lang.write(fromApi)

      return fromApi
    },
  }
}
