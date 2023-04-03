import { ILangsInStorage } from './LangsInStorage'
import type { ILang } from '@root/pages/api/lang'

export interface IOneLangInStorage {
  content(): ILang | undefined
  write(lang: ILang): void
  clear(): void
}

export function OneLangInStorage(
  origin: ILangsInStorage,
  name?: string,
): IOneLangInStorage {
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
          ...(content?.dicts ?? {}),
          [lang.name]: lang.dict,
        },
      })
    },
    clear: origin.clear,
  }
}
