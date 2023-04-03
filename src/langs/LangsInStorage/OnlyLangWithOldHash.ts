import { ILangsInStorage } from './LangsInStorage'
import { IOneLangInStorage } from './OneLangInStorage'

export function OnlyLangWithOldHash(
  origin: IOneLangInStorage,
  langs: ILangsInStorage,
): IOneLangInStorage {
  return {
    write(lang) {
      const oldLangs = langs.content()

      if (oldLangs?.hash && oldLangs?.hash === lang.hash) {
        origin.write(lang)
      }
    },
    clear: origin.clear,
    content: origin.content,
  }
}
