import { cachedOnceReplaceable } from '~/core/cachedOnce'
import { nonNullable } from '~/core/nonNullable'
import { ILangsInStorage } from './LangsInStorage'

const parsedJSON = cachedOnceReplaceable((json: string) => JSON.parse(json))

export function LangsInLocalStorage(
  key = '__HASHED_LANGUAGES_STORAGE__',
): ILangsInStorage {
  return {
    content() {
      try {
        return parsedJSON(nonNullable(localStorage.getItem(key)))
      } catch (_error) {
        return undefined
      }
    },
    write(langs) {
      const langsAsString = JSON.stringify(langs)

      localStorage.setItem(key, langsAsString)

      parsedJSON.replace(langs, langsAsString)
    },
    clear() {
      localStorage.removeItem(key)
    },
  }
}
