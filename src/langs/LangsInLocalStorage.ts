import { nonNullable } from '~/core/nonNullable'
import type { ILang } from '@root/pages/api/lang'

type ILangs = Pick<ILang, 'names' | 'defaultName' | 'hash'> & {
  dicts: Record<string, ILang['dict']>
}

export interface ILangsInLocalStorage {
  content(): ILangs | undefined
  write(langs: ILangs): void
  clear(): void
}

export function LangsInLocalStorage(
  key = '__HASHED_LANGUAGES_STORAGE__',
): ILangsInLocalStorage {
  return {
    content() {
      try {
        return JSON.parse(nonNullable(localStorage.getItem(key)))
      } catch (_error) {
        return undefined
      }
    },
    write(langs) {
      localStorage.setItem(key, JSON.stringify(langs))
    },
    clear() {
      localStorage.removeItem(key)
    },
  }
}

export interface ILangInLocalStorage {
  content(): ILang | undefined
  write(lang: ILang): void
  clear(): void
}

export function LangInLocalStorage(
  origin: ILangsInLocalStorage,
  name?: string,
): ILangInLocalStorage {
  return {
    content() {
      const content = origin.content()

      if (content === undefined) {
        return undefined
      }

      const dict = content.dicts[name ?? content.defaultName]

      if (dict === undefined) {
        return undefined
      }

      return {
        dict,
        hash: content.hash,
        name: name ?? content.defaultName,
        defaultName: content.defaultName,
        names: content.names,
      }
    },
    write(lang) {
      const content = origin.content()

      origin.write({
        names: lang.names,
        defaultName: lang.defaultName,
        hash: lang.hash,
        dicts: {
          ...(lang.hash && lang.hash === content?.hash ? content?.dicts : {}),
          [lang.name]: lang.dict,
        },
      })
    },
    clear: origin.clear,
  }
}
